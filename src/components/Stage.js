import React from 'react'

import TaskFull from '../components/TaskFull'
import Task from './Task'
const Stage = (props) => {
    const { stage, tasks, activeTask, stageHandler, listName, activeTaskInputs, listId } = props
    const { handlers } = props
    const stageTasks = tasks ? tasks.filter(task => task.stage === stage) : null
    console.log(activeTask, 'Active task z staga');

    const map = stageTasks ? stageTasks.map(task => <Task key={task._id} listName={listName} listId={listId} task={task} stageHandler={stageHandler} fullTaskHandler={handlers.fullTaskHandler} />) : null

    return (
        <div className="stag1 tasks-box">
            <h2 className="stage-name">To Do</h2>{map}
            {stage === 1 ? <div className="tasks-footer">
                <button id={listId} data-listname={listName} onClick={handlers.addTaskHandler} className="add-task-btn btn-rec">Add</button>
            </div> : null}
            {activeTask && activeTask.task.stage === stage && activeTask.task.list === listId ? <TaskFull handler={handlers.fullTaskHandler} task={activeTask} activeTaskInputs={activeTaskInputs} /> : null}
        </div>
    );
}

export default Stage;