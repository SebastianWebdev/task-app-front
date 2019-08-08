import { customFetch } from '../functions/fetch'
const deleteTask = async (id) => {
    const url = `https://sebastian-webdev-task-app.herokuapp.com/tasks/${id}`
    const options = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/json",
            'Authorization': ""
        },
    }
    const token = sessionStorage.accessToken ? sessionStorage.accessToken : localStorage.accessToken
    const authOption = 'Bearer ' + token
    if (!options.headers.Authorization) {
        options.headers.Authorization = authOption
    }
    try {
        await customFetch(url, options)
    } catch (e) {
        console.log(e);
    }
}
export {
    deleteTask
}