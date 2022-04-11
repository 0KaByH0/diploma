import React from 'react';
import { getFilterSettings, getRooms } from '../../redux/selectors/rooms.selectors';
import { Room } from '../types/rooms.types';
import { useAppSelector } from './redux';
import { useDebounce } from './useDebounce';

const useFilter = () => {
  const rooms = useAppSelector(getRooms);
  const filter = useAppSelector(getFilterSettings);
  const [filteredRooms, setFilteredRooms] = React.useState<Room[] | []>([]);

  React.useEffect(() => {
    setFilteredRooms(
      rooms.filter((room) => {
        if (
          (room.password.length && filter.withPass) ||
          (!room.password.length && !filter.withPass)
        ) {
          if (filter.maxUsers === 0 || room.maxUsers === filter.maxUsers) {
            if (room.users.length >= filter.withUsersMore) {
              if (room.isLiveChat === filter.withLiveChat) {
                if (filter.lang === 'any' || room.language === filter.lang) {
                  return room;
                }
              }
            }
          }
        }
      }),
    );
  }, [filter]);

  return filter.on ? filteredRooms : rooms;
};

export const useRooms = (search: string) => {
  const rooms = useFilter();
  const filter = useAppSelector(getFilterSettings);
  const debounce = useDebounce(search, 100);

  const [searchedRooms, setSearchedRooms] = React.useState<Room[] | []>([]);

  React.useEffect(() => {
    setSearchedRooms(rooms);
  }, [rooms]);

  React.useEffect(() => {
    setSearchedRooms(
      filter.searchBy === 'name'
        ? rooms.filter((room) => room.name.toLowerCase().includes(search.toLowerCase()))
        : rooms.filter((room) => room.id === +search.toLowerCase()),
    );
  }, [debounce]);

  return searchedRooms;
};
