import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  joinRoomAction,
  signOutAction,
  startFetchingRooms,
  stopFetchingRooms,
} from '../../../redux/actions/sagaActions';
import { getRooms } from '../../../redux/selectors/rooms.selectors';
import { useAppSelector } from '../../../utils/hooks/redux';

export const Rooms: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rooms = useAppSelector(getRooms);

  React.useEffect(() => {
    const disconnect = () => {
      window.confirm('Are u sure leave?') && dispatch(signOutAction());
    };
    dispatch(startFetchingRooms());
    window.addEventListener('popstate', disconnect);

    return () => {
      dispatch(stopFetchingRooms());
      window.removeEventListener('popstate', disconnect);
    };
  }, []);

  const onRoomEnterned = (roomId: number) => {
    dispatch(joinRoomAction(roomId));
    navigate(`/rooms/${roomId}`);
  };

  return (
    <div>
      Rooms
      <ul>
        {rooms.map((room, index) => (
          <li key={index} onClick={() => onRoomEnterned(room.id)}>
            <span style={{ marginRight: 25 }}>{`Room: ${room.name}`}</span>
            <span>{`Users: ${room.users.length}`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
