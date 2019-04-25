import {
    customFetch
} from './fetch'
const getTasks = async (token) => {
    const url = 'https://sebastian-webdev-task-app.herokuapp.com/tasks/'
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }

    }
    try {
        const tasks = await customFetch(url, options)
        return tasks
    } catch (e) {
        console.log(e);
    }

}

export {
    getTasks
}