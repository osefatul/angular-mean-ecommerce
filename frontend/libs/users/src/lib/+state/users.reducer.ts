import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../models/user';

import * as UsersActions from './users.actions';
import { UsersEntity } from './users.models';

export const USERS_FEATURE_KEY = 'users';



//our created state:
export interface UsersState {
  user: User;
  isAuthenticated: boolean;
}

export const initialUsersState: UsersState = {
  user: null,
  isAuthenticated: false
};


export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}


const usersReducer = createReducer(
  initialUsersState,
  on(UsersActions.buildUserSession, (state) => ({ ...state })),
  on(UsersActions.buildUserSessionSuccess, (state, action)=> ({
    ...state, 
    user:action.user,
    isAuthenticated: true,
  })),
  on(UsersActions.buildUserSessionFailed, (state) => ({
    ...state,
    user: null,
    isAuthenticated: false
  }))
);

export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}