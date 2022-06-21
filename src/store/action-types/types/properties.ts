import { propertiesActionTypes } from "../enums";
import { PropertyValues } from '../../../types';

interface FetchAction {
    type: propertiesActionTypes.FETCH_ALL,
    payload: PropertyValues[]
}

interface CreateAction {
    type: propertiesActionTypes.CREATE,
    payload?: PropertyValues
}

interface UpdateAction {
    type: propertiesActionTypes.UPDATE,
    payload?: PropertyValues
}

interface DelateAction {
    type: propertiesActionTypes.DELETE,
    payload?: PropertyValues
}

interface LoadImagesAction {
    type: propertiesActionTypes.LOADIMAGES,
    payload?: string[]
}

interface FetchItem {
    type: propertiesActionTypes.FETCH_ITEM,
    payload: PropertyValues
}

interface FetchRequest {
    type: propertiesActionTypes.FETCH_REQUEST,
    payload: boolean
}

export type PropertiesAction = FetchAction | FetchRequest | CreateAction | UpdateAction | DelateAction | LoadImagesAction | FetchItem;