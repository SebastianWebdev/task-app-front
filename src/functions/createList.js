const createList = owner => {
    const createdAt = new Date().toISOString()
    const tempId = new Date().getTime()
    const newList = {
        tittle: 'Nowa Lista',
        description: "Tutaj umieść opis",
        _id: '',
        temp_id: tempId,
        createdAt,
        tasks: [],
        owner,
        completed: false
    }
    return newList
}
export default createList