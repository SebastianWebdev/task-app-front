import {
    customFetch
} from '../functions/fetch'
const updateTask = async (url, id, body) => {
    const finalUrl = url + id
    const options = {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/json",
            'Authorization': ""
        },
        body: JSON.stringify(body)
    }
    const token = sessionStorage.accessToken ? sessionStorage.accessToken : localStorage.accessToken
    const authOption = 'Bearer ' + token
    if (!options.headers.Authorization) {
        options.headers.Authorization = authOption
    }
    try {
        const fetch = await customFetch(finalUrl, options)

        return fetch

    } catch (e) {

        console.log(e);
        return e

    }

}
export {
    updateTask
}