import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'

import { userReducer } from './user/userReducer';
import { friendReducer } from './friend/friendReducer';


const rootReducer = combineReducers({
    user: userReducer,
    friend: friendReducer
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)
