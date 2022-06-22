import { userActionTypes } from "../action-types/enums";
import { Dispatch } from "redux";
import { UserActionType } from "../action-types/types/user";
import { RegisterValues, LoginValues } from '../../types'
import * as api from '../../api'

export const register = (registerData: RegisterValues) => {
    return async (dispatch: Dispatch<UserActionType>) => {
        try {
            dispatch<any>(authRequest(true, ''));
            const { data } = await api.users.registerUser(registerData);
            
            dispatch<any>(authRequest(false, 'success'));
            dispatch({
                type: userActionTypes.REGISTER,
                payload: data
            })    
        } catch (error) {
            console.log(error);
            dispatch<any>(authRequest(false, 'errors'));
        }
    }
}

export const authRequest = (value: boolean, message: string) => {
    return (dispatch: Dispatch<UserActionType>) => {
        dispatch({
            type: userActionTypes.AUTH_REQUEST,
            payload: {
                loading: value,
                feedback: message
            }
        })
    }
}

export const login = (loginData: LoginValues) => {
    return async (dispatch: Dispatch<UserActionType>) => {
        try {
            dispatch<any>(authRequest(true, ''));
            const { data } = await api.users.loginUser(loginData);
            
            dispatch<any>(authRequest(false, 'success'));
            dispatch({
                type: userActionTypes.LOGIN,
                payload: data
            })   
        } catch (error) {
            console.log(error);
            dispatch<any>(authRequest(false, 'errors'));
        }
    }
}

export const logout = () => {
    return (dispatch: Dispatch<UserActionType>) => {
        dispatch({
            type: userActionTypes.LOGOUT
        })
    }
}

export const reset = (email: {}) => {
    return async (dispatch: Dispatch<UserActionType>) => {
        dispatch({
            type: userActionTypes.RESET,
            payload: email
        })
    }
}

export const resetpassword = (resetDetails: {}) => {
    return async (dispatch: Dispatch<UserActionType>) => {
        dispatch({
            type: userActionTypes.CHANGEPASSWORD,
            payload: resetDetails
        })
    }
}