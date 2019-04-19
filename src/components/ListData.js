import React from 'react'
const ListData = (props) => {
    const { activeList, handler, activeListInputs, isListEddited } = props

    return (
        <div className="ListHead" data-listid={activeList[0]._id}>
            <input value={activeListInputs.tittle} data-listid={activeList[0]._id} onChange={handler} name="list-tittle" type="text" />
            <input value={activeListInputs.description} data-listid={activeList[0]._id} onChange={handler} name="list-description" type="text" />
            {isListEddited ? <button data-listid={activeList[0]._id} onClick={handler} className="save-btn save-btn-list" > Zapisz zmiany</button> : null}

        </div>
    );
}

export default ListData;