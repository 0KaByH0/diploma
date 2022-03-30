import React from 'react';
import { getCurrentRoom, getRoomUsers } from '../../../redux/selectors/rooms.selectors';
import { useAppSelector } from '../../../utils/hooks/redux';
import './RoomInfo.styles.scss';

export const RoomInfo: React.FC = () => {
  const room = useAppSelector(getCurrentRoom);
  const users = useAppSelector(getRoomUsers);

  return (
    <section className="info">
      <p>
        <span>{room.name}</span>
      </p>
      <p>
        Id: <span>{room.id}</span>
      </p>
      Users:
      <ul>
        {users?.map((user) => (
          <li>{user.name}</li>
        ))}
      </ul>
    </section>
  );
};
