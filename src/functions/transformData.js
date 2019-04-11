const transformData = (tasks, lists) => {
    const data = {}
    lists.forEach(list => {
        const listTasks = tasks.filter(task => list._id === task.list)
        list.tasks = listTasks
    })
    data.lists = lists
    return data

}
export {
    transformData
}