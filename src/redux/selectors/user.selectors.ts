import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../utils/types/redux.types';

export const getUser = (state: RootState) => state.user;

export const getUserName = createSelector(getUser, (user) => user.name);

export const getUserId = createSelector(getUser, (user) => user.id);

export const getIsAuthed = createSelector(getUser, (user) => user.isAuth);
