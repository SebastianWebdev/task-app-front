const uploudFile = async (file) => {
    const formData = new FormData()
    formData.append('avatar', file)
    const url = "https://sebastian-webdev-task-app.herokuapp.com/users/me/avatar"
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')}`,
        },
        body: formData
    }
    try {
        const res = await fetch(url, options)
        return res
    } catch (e) {
        throw new Error(e)
    }
}
const handleDroppedFiles = async (files) => {
    if (files.length === 1) {
        try {
            const res = await uploudFile(files[0])
            return res
        } catch (e) {
            throw new Error(e)
        }
    } else {
        const filesArr = [...files]
        filesArr.forEach(file => { uploudFile(file) })
    }
}
export default handleDroppedFiles