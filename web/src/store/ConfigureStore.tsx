import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {imageReducer} from "../actions/ImageReducers";

const rootReducer = combineReducers({
  images: imageReducer,
});

export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}
