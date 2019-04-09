const taskFilter = (tasks = [], cond) => {
    const filteredTasks = {
        stage1: [],
        stage2: [],
        stage3: []
    }
    if (cond) {
        filteredTasks.stage1 = tasks.filter(task => task.stage === 1)
        filteredTasks.stage2 = tasks.filter(task => task.stage === 2)
        filteredTasks.stage3 = tasks.filter(task => task.stage === 3)
        return filteredTasks
    } else {
        return filteredTasks
    }

}
export {
    taskFilter
}