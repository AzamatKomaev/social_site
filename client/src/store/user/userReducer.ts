import { GET_USER_DATA } from './actionType';


const defaultState = {
    info: null,
    isAuth: false
}

export const userReducer = (state: any = defaultState, action: any) => {
    switch (action.type) {
        case GET_USER_DATA:
            return {...state, ...action.payload}
        default:
            return state
    }
}


