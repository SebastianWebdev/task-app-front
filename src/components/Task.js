import React from 'react';

const Task = (props) => {
    const { tittle, stage, _id, stageHandler, fullTaskHandler } = props

    return (
        <div className="task" data-stage={stage} data-type="taskSmall" id={_id} onClick={fullTaskHandler}>
            <h1 className="task-tittle">{tittle}</h1>
            {stage !== 3 ? <button data-type="move" onClick={stageHandler} className="task-btn done-btn"><i data-type="move" class="fas fa-arrow-right"></i></button> : null}

        </div>
    );
}

export default Task;