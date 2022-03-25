import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { signOutAction } from '../../../redux/actions/sagaActions';
import { getIsAuthed, getUserName } from '../../../redux/selectors/user.selectors';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/redux';

//@ts-ignore
import Logo from '../../data/logo.png';
import './Header.styles.scss';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userName = useAppSelector(getUserName);
  const isAuthed = useAppSelector(getIsAuthed);

  const isInRoom = location.pathname.includes('rooms/');

  return (
    <div>
      {isAuthed && (
        <>
          <header className="header">
            <img src={Logo} alt="logo" onClick={() => navigate('/rooms')} />
            <div>
              <h2>{userName}</h2>
              <nav>
                <Link className="active" to={'/about'}>
                  About
                </Link>
                <Link className="active" to={'/rooms'}>
                  Rooms
                </Link>
                <Link
                  className={!isInRoom ? 'disabled' : ''}
                  to={!isInRoom ? location.pathname : '/settings'}>
                  Settings
                </Link>
              </nav>
              <button onClick={() => dispatch(signOutAction())}>Logout</button>
            </div>
          </header>
          <div></div>
        </>
      )}
    </div>
  );
};
