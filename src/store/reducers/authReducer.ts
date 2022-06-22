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
    loading: boolean;
    isAuthenticated: boolean;
    feedback: string;
}

const initialState: AuthProp = {
    user: {
        email: '',
        realtorName: ''
    },
    token: '',
    loading: false,
    isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')!),
    feedback: ''
};

export const authReducer: Reducer<AuthProp, Action> = (state = initialState, action) => {
    switch (action.type) {
        case userAction.LOGIN:
            localStorage.setItem('realtor', JSON.stringify(action.payload));
            if (action.payload.token) {
                return { ...state, isAuthenticated: true }
            }
            return state;

        case userAction.LOGOUT:
            localStorage.clear();

            return { ...state, isAuthenticated: false, feedback: '' };

        case userAction.REGISTER:
            localStorage.setItem('realtor', JSON.stringify(action.payload));
            if (action.payload.token) {
                return { ...state, isAuthenticated: true }
            }
            return state;

        case userAction.AUTH_REQUEST:
            return { ...state, loading: action.payload.loading, feedback: action.payload.feedback };

        default:
            return state;
    }
};
