import { iUser } from '../models/auth/user.interface';
import * as userActions from './user.actions';

export type Action = userActions.All;

const defaultUser = new iUser(null, 'GUEST', null, false, null, null, null, 'guest' , null);

/// Reducer function
export function userReducer(state: iUser = defaultUser, action: Action) {

  switch (action.type) {
    case userActions.GET_USER:
        return { ...state };

    case userActions.SET_USER:
        return { ...state, ...action.payload };

    case userActions.RESET_USER:
        return { ...state, ...defaultUser, error: action.payload };

    default:
        return { ...state }

  }
}
