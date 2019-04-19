const createList = owner => {
    const createdAt = new Date().toISOString()
    const newList = {
        tittle: 'Nowa Lista',
        description: "Tutaj umieść opis",
        _id: createdAt,
        createdAt,
        tasks: [],
        owner,
        completed: false
    }
    return newList
}
export default createList