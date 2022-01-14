import axios from 'axios';
import {FriendRequestI} from "../interfaces";


interface FriendRequestDataI {
    friendRequest?: FriendRequestI | null,
    error: number | null
}

interface FriendNotificationDataI {
    notifications: Array<FriendRequestI> | null,
    error: number | null
}

const getFriendRequest = async(userId: number): Promise<FriendRequestDataI> => {
    let data: FriendRequestDataI = {
        friendRequest: null,
        error: null
    }

    await axios.get("http://127.0.0.1:8000/api/v1/user/find/" + userId + "/friend_request/", {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            data.friendRequest = response.data
        })
        .catch((err) => {
            data.error = err.response.status
        })

    return data
}

const getAllFriendNotifications = async(userId: number): Promise<FriendNotificationDataI> => {
    let data: FriendNotificationDataI = {
        notifications: null,
        error: null
    }

    await axios.get("http://127.0.0.1:8000/api/v1/user/find/" + userId + "/request-notifications/", {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            data.notifications = response.data
        })
        .catch((error) => {
            data.error = error.response.status
        })

    return data
}


const sendFriendRequest = async(userId: number): Promise<FriendRequestDataI> => {
    let data: FriendRequestDataI = {
        friendRequest: null,
        error: null
    }

    await axios.post("http://127.0.0.1:8000/api/v1/user/find/" + userId + "/friend_request/", {}, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            data.friendRequest = response.data
        })
        .catch((err) => {
            data.error = err.response.status
        })

    return data;
}

const deleteFriendRequest = async(userId: number): Promise<number | undefined> => {
    let statusCode: number | undefined;

    await axios.delete("http://127.0.0.1:8000/api/v1/user/find/" + userId + "/friend_request/", {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            statusCode = response.status
        })
        .catch((error) => {
            statusCode = error.response.status
        })

    return statusCode
}

const patchFriendRequest = async(userId: number, isAccepted: number): Promise<FriendRequestDataI> => {
    let data: FriendRequestDataI = {
        friendRequest: null,
        error: null
    };

    await axios.patch("http://127.0.0.1:8000/api/v1/user/find/" + userId + "/friend_request/?is_accepted=" + isAccepted, {}, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            data.friendRequest = response.data
        })
        .catch((error) => {
            data.error = error.response.status
        })

    return data;
}


export {
    getFriendRequest,
    getAllFriendNotifications,
    sendFriendRequest,
    deleteFriendRequest,
    patchFriendRequest
}
