import { createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk'

import { userReducer } from './user/userReducer';
import { friendRequestReducer, friendListReducer } from './friend/friendReducer';
import {requestListReducer} from "./chat/chatReducer";


const rootReducer = combineReducers({
    user: userReducer,
    friendRequest: friendRequestReducer,
    friendList: friendListReducer,
    requestList: requestListReducer
})


export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export type RootState = ReturnType<typeof rootReducer>
