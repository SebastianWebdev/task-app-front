import { customFetch } from './fetch'

const updateDB = (url, body) => {
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
    const options = {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    }
    customFetch(url, options).then(res => {
        console.log(res);
    }).catch(e => {
        console.log(e);
    })
}
export default updateDB