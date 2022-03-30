import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/redux';
import { sendMessageInChat } from '../../../redux/actions/sagaActions';

import { getChat, getCurrentRoom } from '../../../redux/selectors/rooms.selectors';
import './Chat.styles.scss';

export const Chat = () => {
  const dispatch = useAppDispatch();
  const room = useAppSelector(getCurrentRoom);
  const chat = useAppSelector(getChat);
  const [message, setMessage] = React.useState('');

  return (
    <section className="chat">
      <input type="text" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => dispatch(sendMessageInChat(message))}>Send</button>
      <div>
        {chat.map((message) => (
          <p>
            {message.type === 'CONNECTED' || message.type === 'DISCONNECTED' ? (
              <>
                <span>{message.date} </span>
                <span>
                  {message.user.name} {message.type}
                </span>
              </>
            ) : (
              <>
                <span>{message.date} </span>
                <span>{message.user.name} </span>
                <span>{message.text} </span>
              </>
            )}
          </p>
        ))}
      </div>
    </section>
  );
};
