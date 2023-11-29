import {ImageActionTypes, ImageState} from "../types/imagesTypes";

const initialState: ImageState = {
    items: [],
    loading: false,
    error: null,
};

export function imageReducer(state = initialState, action: ImageActionTypes): ImageState {
    switch (action.type) {
        case 'FETCH_IMAGES_BEGIN':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'FETCH_IMAGES_SUCCESS':
            return {
                ...state,
                loading: false,
                items: action.payload.images,
            };
        case 'FETCH_IMAGES_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: [],
            };
        default:
            return state;
    }
}