import React from 'react';
import { useNavigate } from 'react-router';
import { signOutAction } from '../../../redux/actions/sagaActions';
import { getIsAuthed, getUserName } from '../../../redux/selectors/user.selectors';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/redux';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(getUserName);
  const isAuthed = useAppSelector(getIsAuthed);
  const navigate = useNavigate();

  return (
    <div>
      Header{' '}
      {isAuthed && (
        <div>
          <span>User: {userName} </span>
          <button onClick={() => dispatch(signOutAction())}>Logout</button>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      )}
    </div>
  );
};
