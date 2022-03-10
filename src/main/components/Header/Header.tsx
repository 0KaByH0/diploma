import React from 'react';
import { signOutAction } from '../../../redux/actions/sagaActions';
import { getIsAuthed } from '../../../redux/selectors/user.selectors';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/redux';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthed = useAppSelector(getIsAuthed);

  return (
    <div>
      Header {isAuthed && <button onClick={() => dispatch(signOutAction())}>Logout</button>}
    </div>
  );
};
