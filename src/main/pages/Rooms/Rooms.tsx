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
import { useDebounce } from '../../../utils/hooks/useDebounce';
import { Room } from '../../../utils/types/rooms.types';
import { FilterIcon, SearchIcon } from '../../components/Icons/Rooms.icons';

import './Rooms.styles.scss';

export const Rooms: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rooms = useAppSelector(getRooms);

  const [search, setSearch] = React.useState<string>('');
  const debounce = useDebounce(search, 100);

  const [filteredRooms, setFilteredRooms] = React.useState<Room[] | []>(rooms);

  React.useEffect(() => {
    setFilteredRooms(rooms);
  }, [rooms]);

  React.useEffect(() => {
    setFilteredRooms(
      rooms.filter((room) => room.name.toLowerCase().includes(search.toLowerCase())),
    );
  }, [debounce]);

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
    <div className="rooms">
      <div className="rooms-searcher">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search room"
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
        />
        <FilterIcon />
      </div>
      <ul className="rooms-list">
        {filteredRooms.map((room, index) => (
          <li key={index} onClick={() => onRoomEnterned(room.id)}>
            <span>{room.name}</span>
            <span>{room.users.length}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
