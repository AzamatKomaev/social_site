export const defaultConfig = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
}
