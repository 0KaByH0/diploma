import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  joinRoomAction,
  signOutAction,
  startFetchingRooms,
  stopFetchingRooms,
} from '../../../redux/actions/sagaActions';
import { getIcon } from '../../../utils/helpers/getIcon';
import { useRooms } from '../../../utils/hooks/useRooms';
import { VideoIcon } from '../../components/Icons/Editor.icons';
import { UserIcon } from '../../components/Icons/Header.icons';
import {
  FilterIcon,
  PasswordOffIcon,
  PasswordOnIcon,
  SearchIcon,
} from '../../components/Icons/Rooms.icons';
import { FilterModal } from '../../modals/FilterModal/FilterModal';

import './Rooms.styles.scss';

export const Rooms: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>('');
  const rooms = useRooms(search);

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
    const room = rooms.find((room) => room.id === roomId);
    if (room?.password.length) {
      if (window.prompt() === room.password) {
        dispatch(joinRoomAction(roomId));
        navigate(`/rooms/${roomId}`);
      } else {
        alert('Incorrect room password');
      }
    } else {
      dispatch(joinRoomAction(roomId));
      navigate(`/rooms/${roomId}`);
    }
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
        <FilterIcon onClick={() => setOpenModal((prev) => !prev)} />
      </div>
      <ul className="rooms-list">
        {rooms.map((room, index) => (
          <li key={index} onClick={() => onRoomEnterned(room.id)}>
            <span>{room.name}</span>
            <span className="users-online">
              <UserIcon />
              Online: {room.users.length}
            </span>
            <span>Max: {room.maxUsers}</span>
            <span>
              {room.isLiveChat ? <VideoIcon video={false} /> : <VideoIcon video={true} />}
            </span>
            <span>{room.password ? <PasswordOnIcon /> : <PasswordOffIcon />}</span>
            <span className="lang">{getIcon(room.language)}</span>
          </li>
        ))}
      </ul>

      {openModal && <FilterModal setOpen={setOpenModal} />}
    </div>
  );
};
