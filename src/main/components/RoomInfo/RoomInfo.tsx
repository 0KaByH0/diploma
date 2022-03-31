//@ts-nocheck
import React from 'react';
import { getCurrentRoom, getRoomUsers } from '../../../redux/selectors/rooms.selectors';
import { getUser } from '../../../redux/selectors/user.selectors';
import { useAppSelector } from '../../../utils/hooks/redux';
import './RoomInfo.styles.scss';

export const RoomInfo: React.FC = () => {
  const room = useAppSelector(getCurrentRoom);
  const users = useAppSelector(getRoomUsers);
  const currentUser = useAppSelector(getUser);

  return (
    <section className="room-info">
      <div>
        <p className="name">
          <span>{room.name}</span>
        </p>
        <p className="id">
          ID:
          <span>{room.id}</span>
        </p>
      </div>
      <ul className="users">
        <span>Users</span>
        {users?.map((user) => (
          <li>
            <span>{user.name}</span>
            <span>{user.company}</span>
            <span
              className="color"
              style={{
                backgroundColor: currentUser.id !== user.id ? user.editor.color : '',
              }}></span>
          </li>
        ))}
      </ul>
    </section>
  );
};
