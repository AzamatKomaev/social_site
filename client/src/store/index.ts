import { createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk'

import { userReducer } from './user/userReducer';
import { friendRequestReducer, friendListReducer } from './friend/friendReducer';
import {chatListReducer, requestListReducer} from "./chat/chatReducer";
import {personalChatReducer} from "./chat/personalChatReducer";
import {categoryReducer} from "./content/reducers/categoryReducer";
import {postReducer} from "./content/reducers/postReducer";


const rootReducer = combineReducers({
    user: userReducer,
    friendRequest: friendRequestReducer,
    friendList: friendListReducer,
    requestList: requestListReducer,
    chatList: chatListReducer,
    personalChatList: personalChatReducer,
    category: categoryReducer,
    post: postReducer
})


export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export type RootState = ReturnType<typeof rootReducer>
