import React from 'react';
import './components Css/TaskFull.css'
const TaskFull = (props) => {
    const { _id, name, description, stage } = props.task
    const { handler } = props


    return (
        <div className="taskFull-wrapp" id={_id} data-type="taskFull" data-stage={stage}>
            <div className="task-close" onClick={handler} data-name="close"><i class="fas fa-times"></i></div>
            <input onChange={handler} className="task-imput" name='name' type="text" placeholder={name} value={name} />
            <input onChange={handler} className="task-imput" name='description' value={description} placeholder={description} type="text" />
            <div className="taskFull-buttons" onClick={handler} >
                <button data-type="save">Zapisz</button>
                <button data-type="delete">usuń</button>

            </div>
        </div>
    );
}

export default TaskFull;