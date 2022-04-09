import React from 'react';
import classNames from 'classnames';
import { AudioIcon, ChatIcon, LeaveIcon, VideoIcon } from '../Icons/Editor.icons';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/redux';
import { RoomsActions } from '../../../redux/slices/rooms.slice';
import { getIsChatOpen, getRoomUsers } from '../../../redux/selectors/rooms.selectors';

type UserVideoProps = {
  stream: MediaStream | null;
  userId: number;
  videoId: string;
  name: string;
  isLocal?: boolean;
  leaveAction: () => void;
};

export const UserVideo: React.FC<UserVideoProps> = ({
  stream,
  userId,
  videoId,
  name,
  isLocal = false,
  leaveAction,
}) => {
  const dispatch = useAppDispatch();
  const isChat = useAppSelector(getIsChatOpen);
  const usersInRoom = useAppSelector(getRoomUsers);
  const [muted, setMuted] = React.useState<boolean>(true);
  const [video, setVideo] = React.useState<boolean>(false);

  const [color, setColor] = React.useState<string>('');

  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      if (stream) {
        videoRef.current.srcObject = stream;

        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };

        videoRef.current.addEventListener('dblclick', () => {
          videoRef.current?.requestPictureInPicture();
        });

        stream.getTracks()[0].enabled = false;
      }
    }
  }, [stream]);

  React.useEffect(() => {
    if (!isLocal) {
      setColor(usersInRoom.find((user) => user.id === userId)?.editor.color ?? '');
    }
  }, [userId]);

  const onAudio = () => {
    if (isLocal && stream) {
      stream.getTracks()[0].enabled = muted;
      setMuted((prev) => !prev);
    }
  };

  const onVideo = () => {
    if (isLocal && stream) {
      stream.getTracks()[1].enabled = video;
      setVideo((prev) => !prev);
    }
  };

  const onChat = () => {
    dispatch(RoomsActions.setChat(!isChat));
  };

  return (
    <>
      {stream && (
        <section>
          <label style={{ backgroundColor: color }}>{name}</label>
          <video
            ref={videoRef}
            id={videoId}
            className={classNames(isLocal ? 'local' : 'remote')}></video>
          {isLocal && (
            <div className="video-controls">
              <div onClick={onVideo}>
                <VideoIcon video={video} />
              </div>
              <div onClick={onAudio}>
                <AudioIcon audio={muted} />
              </div>
              <div onClick={onChat}>
                <ChatIcon chat={isChat} />
              </div>
              <div onClick={leaveAction}>
                <LeaveIcon />
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
};
