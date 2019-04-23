const customFetch = async (url = "", options = {}) => {
    try {
        const fet = await fetch(url, options)
        if (fet.ok) {
            const res = await fet.json()
            return res
        } else {
            console.log(fet.status);
            throw new Error(fet.status)

        }

    } catch (e) {
        console.log(e, 'bład z custom fetch');
        throw new Error(e.message)
    }

}
export { customFetch }

