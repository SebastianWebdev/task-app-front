import React from 'react';
const List = (props) => {
    return (
        <div className="list-item">
            <p className="list-name">{props.name}</p>
        </div>
    );
}

export default List;