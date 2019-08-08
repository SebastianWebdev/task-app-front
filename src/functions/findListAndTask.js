const findListAndTask = (listId, id, data) => {
    const listIndex = data.lists.findIndex(list => list._id === listId);
    const taskIndex = data.lists[listIndex].tasks.findIndex(task => task._id === id);
    const task = data.lists[listIndex].tasks[taskIndex];
    return { listIndex, taskIndex, task };
}
export default findListAndTask