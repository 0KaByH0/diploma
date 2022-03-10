const WebSocket = require('ws');
const express = require('express');
const cors = require('cors');

const wsServer = new WebSocket.Server({ port: 5002 });
const app = express();

// UTILS
const normalizeRoom = (room) => ({ ...room, users: room.users.map((user) => user.userName) });

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
  CODE: 'CODE',
  CURSOR: 'CURSOR',
  LEAVE: 'LEAVE',
};

let rooms = [
  {
    id: 1,
    name: 'First Room',
    messages: [],
    users: [],
    clients: [],
    language: 'javascript',
    code: 'const a = "fffffff";',
  },
  {
    id: 2,
    name: 'Second Room',
    messages: [],
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
          userRoom.users.push(parsedMessage?.user);
          userRoom.clients.push({ id: parsedMessage?.user.id, wsClient });

          wsClient.send(JSON.stringify({ type: MESSAGES.CONNECTED, room: userRoom }));

          sendAll(
            { type: MESSAGES.USER_CONNECTED, room: { ...userRoom, clients: undefined } },
            userRoom.clients,
          );

          break;

        case MESSAGES.CODE:
          userRoom.code = parsedMessage.code;

          sendAll({ type: MESSAGES.CODE, code: parsedMessage.code }, userRoom.clients);
          break;

        case MESSAGES.CURSOR:
          const user = userRoom.users.find((user) => user.id === parsedMessage.user.id);
          user.editor.position = { ...parsedMessage.position };

          sendAll(
            { type: MESSAGES.CURSOR, room: { ...userRoom, clients: undefined } },
            userRoom.clients,
          );
          break;

        case MESSAGES.LEAVE:
          rooms = rooms.map((room) =>
            room.id === userRoom.id
              ? {
                  ...userRoom,
                  users: room.clients.filter((user) => user.id !== parsedMessage.userId),
                  clients: room.clients.filter((user) => user.id !== parsedMessage.userId),
                }
              : room,
          );

          const disConectedRoom = rooms.find((room) => room.id === userRoom.id);

          // wsClient.send(JSON.stringify({ type: MESSAGES.CODE, code: parsedMessage.code }));

          sendAll(
            { type: MESSAGES.USER_DISCONNECTED, room: disConectedRoom },
            disConectedRoom.clients,
          );
          break;

        // case MESSAGES.DISCONNECT:
        //   const roomToDisConnect = rooms.find((room) => room.id === parsedMessage.roomId);
        //   if (roomToDisConnect) {
        //     roomToDisConnect.messages.push({
        //       message: '',
        //       date: new Date().toLocaleTimeString(),
        //       userName: parsedMessage.userName,
        //       type: 'DISCONNECTED',
        //     });

        //     rooms = rooms.map((room) =>
        //       room.id === roomToDisConnect.id
        //         ? {
        //             ...roomToDisConnect,
        //             users: room.users.filter((user) => user.userName !== parsedMessage.userName),
        //           }
        //         : room,
        //     );

        //     const disConectedRoom = rooms.find((room) => room.id === roomToDisConnect.id);
        //     sendAll(
        //       { type: MESSAGES.USER_DISCONNECTED, room: normalizeRoom(disConectedRoom) },
        //       disConectedRoom.users,
        //     );
        //   }
        //   break;
        default:
          break;
      }
    } catch (error) {
      console.log('Error', error);
    }
  });
}
