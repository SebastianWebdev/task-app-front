import React from 'react'
import "./components Css/List.css"
import ListData from './ListData'
import Stage from '../components/Stage'
const ListHooks = props => {
    const { handlers, activeTask, activeList, activeTaskInputs, activeListInputs, isListEddited } = props
    return (
        <div className="app-window-box box-full" >
            {<ListData activeListInputs={activeListInputs} activeList={activeList} handler={handlers.listInputsHandler} outFocusHandler={handlers.listInputsOutFocus} isListEddited={isListEddited} />}
            <div className="tasks-wrapper">
                <Stage stageName='Do Zrobienia' activeTaskInputs={activeTaskInputs} stage={1} activeTask={activeTask} handlers={handlers} tasks={activeList[0].tasks} listName={activeList[0].tittle} stageHandler={handlers.stageTaskHandler} listId={activeList[0]._id} />
                <Stage stageName='W trakcie' activeTaskInputs={activeTaskInputs} stage={2} activeTask={activeTask} tasks={activeList[0].tasks} stageHandler={handlers.stageTaskHandler} listName={activeList[0].tittle} handlers={handlers} listId={activeList[0]._id} />
                <Stage stageName='Zrobione' activeTaskInputs={activeTaskInputs} stage={3} activeTask={activeTask} tasks={activeList[0].tasks} stageHandler={handlers.stageTaskHandler} listName={activeList[0].tittle} handlers={handlers} listId={activeList[0]._id} />
            </div>
        </div >
    )
}
export default ListHooks