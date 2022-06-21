import { combineReducers } from "redux";
import {  authReducer } from "./authReducer";
import { propertiesReducer } from "./propertiesReducer";

export const reducers = combineReducers({
    user: authReducer,
    properties: propertiesReducer
})

export type RootState = ReturnType<typeof reducers>;
