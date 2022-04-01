const WebSocket = require('ws');
const express = require('express');
const cors = require('cors');

const wsServer = new WebSocket.Server({ port: 5002 });
const app = express();

// UTILS
const sendAll = (message, roomUsers) =>
  roomUsers.forEach((user) => user.wsClient.send(JSON.stringify(message)));

// CONSTANTS
const MESSAGES = {
  CONNECT: 'CONNECT',
  DISCONNECT: 'DISCONNECT',
  CONNECTED: 'CONNECTED',
  DISCONNECTED: 'DISCONNECTED',
  USER_CONNECTED: 'USER_CONNECTED',
  USER_DISCONNECTED: 'USER_DISCONNECTED',
  SEND: 'SEND',
  CHAT: 'CHAT',
  CODE: 'CODE',
  CURSOR: 'CURSOR',
  LEAVE: 'LEAVE',
};

let rooms = [
  {
    id: 1,
    name: 'First Room',
    messages: [
      {
        user: {
          name: 'Bro',
          id: 123,
        },
        date: new Date().toLocaleTimeString(),
        type: 'CONNECTED',
      },
      {
        user: {
          name: 'Bro',
          id: 123,
        },
        date: new Date().toLocaleTimeString(),
        text: 'Hi how are you',
        type: 'INFO',
      },
      {
        user: {
          name: 'Bro',
          id: 123,
        },
        date: new Date().toLocaleTimeString(),
        type: 'DISCONNECTED',
      },
    ],
    liveChat: [
      {
        user: {
          name: 'sfd',
          id: 123,
        },
        stream: 'aasdfasdf',
      },
    ],
    users: [],
    clients: [],
    language: 'javascript',
    code: 'const a = "fffffff";',
  },
  {
    id: 2,
    name: 'Second Room',
    messages: [],
    liveChat: [],
    users: [],
    clients: [],
    language: 'javascript',
    code: 'const a = 123;',
  },
];

app.use(cors());
app.get('/rooms', (req, res) => {
  res.send(JSON.stringify(rooms));
});
app.listen(5001);

wsServer.on('connection', onConnect);

function onConnect(wsClient) {
  console.log('User connected');

  wsClient.on('close', (event) => {
    console.log('User disconected');
  });

  wsClient.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      const userRoom = rooms.find((room) => room.id === parsedMessage.roomId);

      switch (parsedMessage.type) {
        case MESSAGES.CONNECT:
          wsClient.send(JSON.stringify({ type: MESSAGES.CONNECTED, room: userRoom }));

          userRoom.users.push(parsedMessage?.user);
          userRoom.clients.push({ id: parsedMessage?.user.id, wsClient });
          userRoom.messages.push({
            text: '',
            date: new Date().toLocaleTimeString(),
            user: {
              name: parsedMessage?.user.name,
              id: parsedMessage?.user.id,
            },
            type: 'CONNECTED',
          });

          sendAll({ type: MESSAGES.CHAT, messages: userRoom.messages }, userRoom.clients);
          sendAll({ type: MESSAGES.USER_CONNECTED, user: parsedMessage?.user }, userRoom.clients);
          break;

        case MESSAGES.CODE:
          userRoom.code = parsedMessage.code;

          sendAll({ type: MESSAGES.CODE, code: parsedMessage.code }, userRoom.clients);
          break;

        case MESSAGES.CURSOR:
          const user1 = userRoom.users.find((user) => user.id === parsedMessage.user.id);
          user1.editor.position = { ...parsedMessage.position };

          sendAll({ type: MESSAGES.CURSOR, user: user1 }, userRoom.clients);
          break;

        case MESSAGES.LEAVE:
          const userToLeave = rooms
            .find((room) => room.id === userRoom.id)
            .users.find((user) => user.id === parsedMessage.userId);

          rooms = rooms.map((room) =>
            room.id === userRoom.id
              ? {
                  ...userRoom,
                  users: room.users.filter((user) => user.id !== parsedMessage.userId),
                  clients: room.clients.filter((client) => client.id !== parsedMessage.userId),
                }
              : room,
          );

          const disConectedRoom = rooms.find((room) => room.id === userRoom.id);

          disConectedRoom.messages.push({
            text: '',
            date: new Date().toLocaleTimeString(),
            user: {
              name: userToLeave.name,
              id: parsedMessage.userId,
            },
            type: 'DISCONNECTED',
          });
          sendAll({ type: MESSAGES.USER_DISCONNECTED, user: userToLeave }, disConectedRoom.clients);
          break;

        case MESSAGES.CHAT:
          const userThatSendChat = userRoom.users.find((user) => user.id === parsedMessage.userId);
          userRoom.messages.push({
            text: parsedMessage.message,
            date: new Date().toLocaleTimeString(),
            user: {
              name: userThatSendChat.name,
              id: userThatSendChat.id,
            },
            type: 'INFO',
          });

          sendAll({ type: MESSAGES.CHAT, messages: userRoom.messages }, userRoom.clients);
          break;

        case MESSAGES.CHAT:
          // sendAll({ type: MESSAGES.CHAT, messages: userRoom.messages }, userRoom.clients);
          break;

        default:
          break;
      }
    } catch (error) {
      console.log('Error', error);
    }
  });
}
