import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { signOutAction } from '../../../redux/actions/sagaActions';
import { getIsAuthed, getUserName } from '../../../redux/selectors/user.selectors';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/redux';

//@ts-ignore
import Logo from '../../data/logo.png';
import { AboutIcon, RoomsIcon, SettingsIcon, UserIcon } from '../Icons/Header.icons';
import './Header.styles.scss';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userName = useAppSelector(getUserName);
  const isAuthed = useAppSelector(getIsAuthed);

  const isActive = (link: string) => (location.pathname.includes(link) ? 'active' : '');
  const isInRoom = location.pathname.includes('rooms/');

  return (
    <div>
      {isAuthed && (
        <>
          <header className="header">
            <img src={Logo} alt="logo" onClick={() => navigate('/rooms')} />
            <div className="container">
              <div className="user">
                <UserIcon />
                <h2>{userName}</h2>
              </div>
              <nav>
                <Link className={isActive('about')} to="/about">
                  <AboutIcon />
                  <label>About</label>
                </Link>
                <Link className={isActive('rooms')} to="/rooms">
                  <RoomsIcon />
                  <label>Rooms</label>
                </Link>
                <Link
                  className={
                    !isInRoom ? `disabled ${isActive('settings')}` : `${isActive('settings')}`
                  }
                  to={!isInRoom ? location.pathname : '/settings'}>
                  <SettingsIcon />
                  <label>Settings</label>
                </Link>
              </nav>
              <button onClick={() => dispatch(signOutAction())}>Exit</button>
            </div>
          </header>
          <div></div>
        </>
      )}
    </div>
  );
};
