import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../utils/hooks/redux';
import { getFilterSettings } from '../../../redux/selectors/rooms.selectors';
import { RoomsActions } from '../../../redux/slices/rooms.slice';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  Button,
  TextField,
} from '@mui/material';
import { ModalContainer } from '../../components/ModalContainer/ModalContainer';
import { Languages } from '../../../utils/types/app.types';

import './FilterModal.scss';

type FilterModalProps = {
  setOpen: any;
};

export const FilterModal: React.FC<FilterModalProps> = ({ setOpen }) => {
  const dispatch = useDispatch();
  const filter = useAppSelector(getFilterSettings);
  const [searchBy, setSearchBy] = React.useState<'id' | 'name'>('id');
  const [lang, setLang] = React.useState<'any' | Languages>('any');
  const [withPass, setWithPass] = React.useState<boolean>(false);
  const [maxUsers, setMaxUsers] = React.useState<number>(0);
  const [users, setUsers] = React.useState<number>(0);
  const [live, setLive] = React.useState<boolean>(true);

  const [filterOn, setFilterOn] = React.useState<boolean>(false);

  React.useEffect(() => {
    setFilterOn(filter.on);
    setSearchBy(filter.searchBy);
    setLang(filter.lang);
    setWithPass(filter.withPass);
    setMaxUsers(filter.maxUsers);
    setUsers(filter.withUsersMore);
    setLive(filter.withLiveChat);
  }, []);

  const saveFilter = () => {
    dispatch(
      RoomsActions.saveFilters({
        on: filterOn,
        searchBy,
        lang,
        withLiveChat: live,
        withPass,
        maxUsers,
        withUsersMore: users,
      }),
    );
    setOpen(false);
  };

  return (
    <ModalContainer setOpen={setOpen}>
      <div className="modal__filter">
        <h2>Filter Settings</h2>

        <FormControlLabel
          label="Enable Filter"
          control={
            <Checkbox
              checked={filterOn}
              value={filterOn}
              onChange={(e) => setFilterOn((prev) => !prev)}
            />
          }
        />
        {filterOn && (
          <>
            <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
              <InputLabel id="demo-simple-select-standard-label">Search By</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={searchBy}
                label="Search By"
                onChange={(event) => setSearchBy(event.target.value as 'id' | 'name')}>
                <MenuItem value="id">Id</MenuItem>
                <MenuItem value="name">Name</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-standard-label">Language</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={lang}
                label="Language"
                onChange={(event) => setLang(event.target.value as Languages)}>
                <MenuItem value="any">Any</MenuItem>
                <MenuItem value={Languages.JAVASCRIPT}>{Languages.JAVASCRIPT}</MenuItem>
                <MenuItem value={Languages.JAVA}>{Languages.JAVA}</MenuItem>
                <MenuItem value={Languages.C}>{Languages.C}</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120, maxHeight: 35 }} size="small">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={withPass}
                    value={withPass}
                    onChange={(e) => setWithPass((prev) => !prev)}
                  />
                }
                label="With Password"
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120, maxHeight: 35 }} size="small">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={live}
                    value={live}
                    onChange={(e) => setLive((prev) => !prev)}
                  />
                }
                label="With Meeting Room"
              />
            </FormControl>
            <TextField
              sx={{ m: 1 }}
              label="Max Users"
              variant="standard"
              size="small"
              value={maxUsers}
              onChange={(e) => setMaxUsers(+e.target.value)}
            />
            <TextField
              sx={{ m: 1 }}
              label="More than users in room"
              variant="standard"
              size="small"
              value={users}
              onChange={(e) => setUsers(+e.target.value)}
            />
          </>
        )}

        <Button variant="contained" onClick={saveFilter}>
          Save
        </Button>
      </div>
    </ModalContainer>
  );
};
