import React from 'react';
import { Route, Routes } from 'react-router';
import { getIsAuthed } from '../../../redux/selectors/user.selectors';
import { useAppSelector } from '../../../utils/hooks/redux';
import { routes } from '../../routes/routes';
import { Authed } from '../AuthedRoute/AuthedRoute';
import { Header } from '../Header/Header';

export const AppComponent: React.FC = () => {
  const isAuthed = useAppSelector(getIsAuthed);
  return (
    <div>
      {isAuthed && <Header />}
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.authed ? <Authed>{route.element}</Authed> : route.element}
          />
        ))}
      </Routes>
    </div>
  );
};
