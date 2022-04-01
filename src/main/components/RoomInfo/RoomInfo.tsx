import React from 'react';
import { getCurrentRoom, getRoomUsers } from '../../../redux/selectors/rooms.selectors';
import { getUser } from '../../../redux/selectors/user.selectors';
import { useAppSelector } from '../../../utils/hooks/redux';
import { CallIcon } from '../Icons/Editor.icons';
import './RoomInfo.styles.scss';

const displayUser = (name: string, company: string) => (
  <li>
    <span>{name}</span>
    <span>{company}</span>
    <span className="color"></span>
  </li>
);

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
        {displayUser(currentUser.name, currentUser.company)}
        {users?.map(
          (user) =>
            currentUser.id !== user.id && (
              <li>
                <span>{user.name}</span>
                <span>{user.company}</span>
                <span className="color" style={{ backgroundColor: user.editor.color }}></span>
                <CallIcon />
              </li>
            ),
        )}
      </ul>
    </section>
  );
};
