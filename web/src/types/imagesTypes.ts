export type FetchImagesBeginAction = {
    type: 'FETCH_IMAGES_BEGIN';
};

export type FetchImagesSuccessAction = {
    type: 'FETCH_IMAGES_SUCCESS';
    payload: {
        images: Image[];
    };
};

export type FetchImagesFailureAction = {
    type: 'FETCH_IMAGES_FAILURE';
    payload: {
        error: Error;
    };
};

export type ImageActionTypes =
    | FetchImagesBeginAction
    | FetchImagesSuccessAction
    | FetchImagesFailureAction;

export type ImageState = {
    items: Image[];
    loading: boolean;
    error: Error | null;
};


export type Image = {
    url: string;
    uuid: string;
    hotkey: string;
    filename: string;
    updatedAt: string;
};