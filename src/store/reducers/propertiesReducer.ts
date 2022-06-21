import { PropertiesAction as Action } from '../action-types/types/properties';
import { propertiesActionTypes as propertyAction } from '../action-types/enums';
import { PropertyValues } from '../../types';
import { Reducer } from 'redux';

interface PropertiesProp {
    items: PropertyValues[],
    property: PropertyValues | undefined,
    loading: boolean,
    images: string[] | undefined
}

const initProperty = {
    images: [],
    rooms: 0,
    bathrooms: 0,
    price: 0,
    sqft: 0,
    description: '',
    title: '',
    place: '',
    type: '',
    contact: '',
    _id: '',
    owner: ''
}

const initialState: PropertiesProp = {
    items: [] as PropertyValues[],
    property: initProperty,
    loading: false,
    images: []
};

export const propertiesReducer: Reducer<PropertiesProp, Action> = (state = initialState, action) => {
    switch (action.type) {
        case propertyAction.FETCH_ALL:

            return { ...state, items: action.payload };
            
        case propertyAction.FETCH_REQUEST:
            
            return { ...state, loading: action.payload };

        case propertyAction.FETCH_ITEM:
            
            return { ...state, property: action.payload };
        
        case propertyAction.CREATE:

            return { ...state, property: action.payload };

        case propertyAction.LOADIMAGES:

            return { ...state, images: action.payload };

        default:
            return state;
    }
};
