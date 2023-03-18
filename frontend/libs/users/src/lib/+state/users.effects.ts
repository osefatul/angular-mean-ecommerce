import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as UsersActions from './users.actions';
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersService } from '../services/users.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class UsersEffects {

  buildUserSession$ = createEffect(() =>
  //listen to all the app actions
    this.actions$.pipe(
      ofType(UsersActions.buildUserSession),
      concatMap(() => {
        if (this.localStorageService.isValidToken()) {
          const userId = this.localStorageService.getUserIdFromToken();
          console.log("check user", userId)
          if (userId) {
            return this.usersService.getUser(userId).pipe(
              map((user) => {
                return UsersActions.buildUserSessionSuccess({ user: user });
              }),
              //if any server errror
              catchError(() => of(UsersActions.buildUserSessionFailed()))
            );
          } else {
            return of(UsersActions.buildUserSessionFailed());
          }
        } else {
          return of(UsersActions.buildUserSessionFailed());
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private usersService: UsersService
  ) {}
}
