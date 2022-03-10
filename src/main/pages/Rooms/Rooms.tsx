import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { getRooms } from '../../../redux/selectors/rooms.selectors';
import { useAppSelector } from '../../../utils/hooks/redux';

export const Rooms: React.FC = () => {
  const dispatch = useDispatch();
  const rooms = useAppSelector(getRooms);
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch({ type: 'ROOMS' });
  }, []);

  const onRoomEnterned = (roomId: number) => {
    dispatch({ type: 'JOIN', payload: roomId });
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
