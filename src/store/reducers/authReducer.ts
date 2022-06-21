import { UserActionType as Action } from '../action-types/types/user';
import { userActionTypes as userAction } from '../action-types/enums';
import { Reducer } from 'redux';

interface UserProp {
    email: string;
    realtorName: string;
}

export interface AuthProp {
    user: UserProp;
    token: string;
    loading: boolean
}

const initialState: AuthProp = {
    user: {
        email: '',
        realtorName: ''
    },
    token: '',
    loading: false
};

export const authReducer: Reducer<AuthProp, Action> = (state = initialState, action) => {
    switch (action.type) {
        case userAction.LOGIN:
            localStorage.setItem('realtor', JSON.stringify(action.payload));
            return state;

        case userAction.LOGOUT:
            localStorage.clear();
            return state;

        case userAction.REGISTER:
            localStorage.setItem('realtor', JSON.stringify(action.payload));
            return state;

        case userAction.AUTH_REQUEST:
            return { ...state, loading: action.payload };

        default:
            return state;
    }
};
