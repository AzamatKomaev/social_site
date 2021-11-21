const getReadableDateFormat = (dateString) => {
    let dateJs = new Date(dateString);
    let result = `${dateJs.getDate()} ${dateJs.toLocaleString('default', { month: 'long' })} ${dateJs.getFullYear()} г. ${dateJs.getHours()}:${dateJs.getMinutes()}`
    return result;
}

export default getReadableDateFormat;
