const createTask = (listId, userId) => {
    const createdAt = new Date().toISOString()
    const tempId = new Date().getTime()
    const body = {
        completed: false,
        owner: userId,
        description: "Empty Task",
        name: "Task Name",
        stage: 1,
        list: listId,
        createdAt,
        updatedAt: createdAt,
        _id: '',
        temp_Id: tempId
    }
    return body
}
export default createTask