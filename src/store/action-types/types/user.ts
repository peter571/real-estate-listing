import { userActionTypes } from '../enums';
import { AuthProp } from '../../reducers/authReducer'


interface LoginAction {
    type: userActionTypes.LOGIN,
    payload: AuthProp 
}

interface LogoutAction {
    type: userActionTypes.LOGOUT
}

interface RegisterAction {
    type: userActionTypes.REGISTER,
    payload: AuthProp
}

interface ResetAction {
    type: userActionTypes.RESET,
    payload: {}
}

interface ChangepasswordAction {
    type: userActionTypes.CHANGEPASSWORD,
    payload: {}
}

interface AuthRequestProp { 
    loading: boolean;
    feedback: string; 
}

interface AuthRequest {
    type: userActionTypes.AUTH_REQUEST,
    payload: AuthRequestProp
}

export type UserActionType = LoginAction | LogoutAction | AuthRequest | RegisterAction | ResetAction | ChangepasswordAction;