import {Dispatch} from 'redux';
import {FetchImagesBeginAction, FetchImagesFailureAction, FetchImagesSuccessAction, Image} from "../types/imagesTypes";
import {BACKEND_BASE_URL} from "../services/api";

const fetchImagesBegin = (): FetchImagesBeginAction => ({
    type: 'FETCH_IMAGES_BEGIN'
});

const fetchImagesSuccess = (images: Image[]): FetchImagesSuccessAction => ({
    type: 'FETCH_IMAGES_SUCCESS',
    payload: {images}
});

const fetchImagesFailure = (error: Error): FetchImagesFailureAction => ({
    type: 'FETCH_IMAGES_FAILURE',
    payload: {error}
});

export const fetchImages = () => {
    return (dispatch: Dispatch) => {
        dispatch(fetchImagesBegin());

        fetch(`${BACKEND_BASE_URL}/images`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json()
            })
            .then(data => {
                dispatch(fetchImagesSuccess(data));
            })
            .catch(error => {
                console.error('Fetch images error:', error);
                dispatch(fetchImagesFailure(error));
            });
    };
};