import React from 'react';
import { Routes } from '../../utils/types/app.types';

import { Editor } from '../pages/Editor/Editor';
import { Rooms } from '../pages/Rooms/Rooms';
import { SignIn } from '../pages/Sign-In/Sign-in';
import { SignUp } from '../pages/Sign-Up/Sign-up';

const ErrorComp: React.FC = () => (
  <>
    <main style={{ padding: '1rem' }}>
      <p>There's nothing here!</p>
    </main>
  </>
);

export const routes: Routes = [
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/rooms',
    element: <Rooms />,
    authed: true,
  },
  {
    path: '/rooms/:id',
    element: <Editor />,
    authed: true,
  },
  {
    path: '*',
    element: <ErrorComp />,
  },
];
