import React from 'react';
import { Route, Routes } from 'react-router';
import { routes } from '../../routes/routes';
import { Authed } from '../AuthedRoute/AuthedRoute';
import { Header } from '../Header/Header';

export const AppComponent: React.FC = () => {
  return (
    <div>
      <Header />
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
