import { customFetch } from '../functions/fetch'
const deleteTask = async (id) => {

    const url = `https://sebastian-webdev-task-app.herokuapp.com/tasks/${id}`
    console.log(url);

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
        const fetch = await customFetch(url, options)
        //console.log("działa try w update tasks", fetch);

    } catch (e) {
        //console.log('działa catch');

        console.log(e);

    }

}
export {
    deleteTask
}