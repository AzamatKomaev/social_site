import axios from 'axios';


interface friendRequestI {
    friendRequest: object | null,
    error: number | null
}

const getFriendRequest = async(user: any) => {
    let data: friendRequestI = {
        friendRequest: null,
        error: null
    }

    await axios.get("http://127.0.0.1:8000/api/v1/user/find/" + user.id + "/friend_request/", {
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


const sendFriendRequest = async(user: any) => {
    let data: friendRequestI = {
        friendRequest: null,
        error: null
    };

    await axios.post("http://127.0.0.1:8000/api/v1/user/find/" + user.id + "/friend_request/", {}, {
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

const deleteFriendRequest = async(user: any) => {
    let statusCode: number | undefined;

    await axios.delete("http://127.0.0.1:8000/api/v1/user/find/" + user.id + "/friend_request/", {
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

const patchFriendRequest = async(user: any, isAccepted: number) => {
    let data: friendRequestI = {
        friendRequest: null,
        error: null
    };

    await axios.patch("http://127.0.0.1:8000/api/v1/user/find/" + user.id + "/friend_request/?is_accepted=" + isAccepted, {}, {
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
    sendFriendRequest,
    deleteFriendRequest,
    patchFriendRequest
}
