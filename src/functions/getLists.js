import {
    customFetch
} from './fetch'
const getLists = async (token) => {
    const url = "https://sebastian-webdev-task-app.herokuapp.com/lists"
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const lists = await customFetch(url, options)
        return lists
    } catch (e) {
        console.log(e);
    }
}
export { getLists }