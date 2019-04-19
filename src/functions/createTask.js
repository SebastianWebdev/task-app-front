const createTask = (listId, userId) => {
    const createdAt = new Date().toISOString()
    const body = {
        completed: false,
        owner: userId,
        description: "Empty Task",
        name: "Task Name",
        stage: 1,
        list: listId,
        createdAt,
        updatedAt: createdAt,
        _id: createdAt
    }
    return body
}
export default createTask