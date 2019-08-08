const customFetch = async (url = "", options = {}) => {
    try {
        const fet = await fetch(url, options)
        if (fet.ok) {
            const res = await fet.json()
            return res
        } else {
            throw new Error(fet.status)
        }
    } catch (e) {
        throw new Error(e.message)
    }
}
export { customFetch }

