const customFetch = async (url = "", options = {}) => {
    try {
        //console.log(options);

        console.log(url, 'url z custom fetch');
        const fet = await fetch(url, options)
        if (fet.ok) {
            const res = await fet.json()
            return res
        } else {
            throw new Error('fetch nie działa', fet)
        }

    } catch (e) {
        console.log(e, 'bład z custom fetch');

    }

}
export {
    customFetch
}