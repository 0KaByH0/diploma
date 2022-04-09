import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/redux';
import { sendMessageInChat } from '../../../redux/actions/sagaActions';

import { getChat, getCurrentRoom, getIsChatOpen } from '../../../redux/selectors/rooms.selectors';
import { getUser } from '../../../redux/selectors/user.selectors';

import './Chat.styles.scss';

const getInvitationMessage = (type: string) =>
  type === 'CONNECTED' ? (
    <span className="enter">entered room</span>
  ) : (
    <span className="leave">leave room</span>
  );

export const Chat = () => {
  const dispatch = useAppDispatch();
  const room = useAppSelector(getCurrentRoom);
  const isChatOpen = useAppSelector(getIsChatOpen);
  const currentUser = useAppSelector(getUser);
  const chat = useAppSelector(getChat);
  const [message, setMessage] = React.useState('');
  const filedRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (filedRef.current) {
      filedRef.current.scrollTop = filedRef.current.scrollHeight;
    }
  }, [chat.length]);

  const sendMessage = () => {
    dispatch(sendMessageInChat(message));
    setMessage('');
  };

  return (
    <section className={classNames('chat', { close: !isChatOpen })}>
      <div className="chat-field" ref={filedRef}>
        {chat.map((message) => (
          <p className={message.user.id === currentUser.id ? 'current' : ''}>
            {message.type !== 'INFO' ? (
              // TODO
              //Maybe better to show modal that user connected
              <div
                className={`invitation-block ${
                  message.type === 'CONNECTED' ? 'connect' : 'disconnect'
                }`}>
                <label>{message.user.name}</label>
                <>{getInvitationMessage(message.type)}</>
              </div>
            ) : (
              <div className="information-block">
                {message.user.id !== currentUser.id && (
                  <label className="user-name">{message.user.name}</label>
                )}
                <div>
                  <span className="message-text">{message.text}</span>
                  <span className="date">{message.date.slice(0, message.date.length - 3)}</span>
                </div>
              </div>
            )}
          </p>
        ))}
      </div>
      <div className="chat-controls">
        <input
          type="text"
          spellCheck={false}
          value={message}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => event}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button disabled={!message} onClick={sendMessage}>
          Send
        </button>
      </div>
    </section>
  );
};
