import { Action } from '@ngrx/store';


export const GET_USER = 'GET_USER'
export const SET_USER = 'SET_USER';
export const RESET_USER = 'RESET_USER';


/// Get User AuthState

export class GetUser implements Action {
    readonly type = GET_USER;
    constructor() {}
}

export class SetUser implements Action {
    readonly type = SET_USER;
    constructor(public payload: any) {}
}

export class ResetUser implements Action {
    readonly type = RESET_USER;
    constructor(public payload: any) {}
}

export type All
= SetUser
| GetUser
| ResetUser;
