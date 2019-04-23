const checkAvatar = (type = "") => {
    const typeArr = type.split('/')

    if (typeArr.includes('image')) {
        return true
    } else {
        return false
    }
}
export default checkAvatar