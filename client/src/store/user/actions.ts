import { GET_USER_DATA } from './actionType';
import {getCurrentUserData} from '../../services/service'

export const fetchUserData = () => {
    return function(dispatch) {
        getCurrentUserData()
            .then((result) => {
                dispatch({type: GET_USER_DATA, payload: result})
            })
    }
}
