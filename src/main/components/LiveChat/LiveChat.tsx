import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/redux';
import { UserVideo } from '../UserVideo/UserVideo';

import { joinLive } from '../../../redux/actions/sagaActions';
import { getUserId } from '../../../redux/selectors/user.selectors';
import {
  getIsChatOpen,
  getLiveChat,
  getNewUserPeerId,
} from '../../../redux/selectors/rooms.selectors';
import { RoomsActions } from '../../../redux/slices/rooms.slice';

import './LiveChat.styles.scss';

export const LiveChat: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(getUserId);
  const newUserPeerId = useAppSelector(getNewUserPeerId);
  const liveChat = useAppSelector(getLiveChat);
  const isChatOpen = useAppSelector(getIsChatOpen);
  const [isStartedChat, setIsStartedChat] = React.useState<boolean>(false);
  const [remoteStreams, setRemoteStreams] = React.useState<
    { userPeerId: string; stream: MediaStream }[]
  >([]);

  const videoGrid = React.useRef<HTMLDivElement>(null);

  const [userPeer, setUserPeer] = React.useState<any>(null);
  const [userStream, setUserStream] = React.useState<MediaStream | null>(null);
  const [connection, setConnection] = React.useState<any>(null);

  //Make Call
  React.useEffect(() => {
    if (userPeer && newUserPeerId && userPeer?._id !== newUserPeerId) {
      setConnection(userPeer.connect(newUserPeerId));

      setTimeout(() => {
        const peerCall = userPeer.call(newUserPeerId, userStream);
        try {
          let k = 0;
          peerCall.on('stream', (stream: MediaStream) => {
            k += 1;
            if (k === 2) {
              setRemoteStreams((prevRemotes) => [
                ...prevRemotes,
                { stream, userPeerId: newUserPeerId },
              ]);
            }
          });
        } catch (error) {
          console.log('getting call response error');
        }
      }, 2000);
    }
  }, [newUserPeerId]);

  React.useEffect(() => {
    if (userPeer) {
      userPeer.on('open', (id: string) => {
        dispatch(joinLive(id));
      });

      userPeer.on('connection', (conn: any) => {
        setConnection(conn);
      });

      if (userStream) {
        userPeer.on('call', function (call: any) {
          call.answer(userStream);
          let k = 0;
          call.on('stream', function (stream: any) {
            k += 1;
            if (k === 2) {
              setRemoteStreams((prevVideos) => [...prevVideos, { stream, userPeerId: call.peer }]);
            }
          });
        });
      }
    }
  }, [userPeer, userStream]);

  const start = React.useCallback(() => {
    const id = Date.now();
    //TODO
    //@ts-ignore
    const peer = new Peer(id, {
      host: 'localhost',
      port: 5001,
      path: '/peerjs',
    });
    setUserPeer(peer);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setUserStream(stream);
        setIsStartedChat(true);
      })
      .catch((err) => {
        console.log('u got an error:' + err);
      });
  }, []);

  const onLeave = () => {
    connection?.close();
    userPeer?.disconnect();

    userStream?.getTracks().forEach((track: MediaStreamTrack) => {
      track.stop();
    });

    setIsStartedChat(false);
    // Opening SMS Chat when closing live chat
    dispatch(RoomsActions.setChat(true));
  };

  const getStream = (id: string) =>
    remoteStreams.find((stream) => stream.userPeerId === id)?.stream ?? null;

  return (
    <section className={classNames('live')}>
      {!isStartedChat && (
        <button onClick={() => start()}>
          {liveChat.length ? 'Join Meeting' : 'Start Meeting'}
        </button>
      )}
      {isStartedChat && (
        <div
          ref={videoGrid}
          id="video-grid"
          className={classNames('u' + liveChat.length, { 'chat-closed': !isChatOpen })}>
          {liveChat.map((remote) => {
            return (
              <UserVideo
                key={remote.userId}
                stream={remote.userId !== userId ? getStream(remote.userPeerId) : userStream}
                videoId={remote.userPeerId}
                userId={remote.userId}
                isLocal={remote.userId === userId}
                name={remote.name}
                leaveAction={onLeave}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};
