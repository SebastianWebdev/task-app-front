import React from 'react';
import { NavLink } from 'react-router-dom'
const ListNavItem = (props) => {

    return (
        <NavLink to={'list'} id={props.name} onClick={props.handler}>
            <div className="list-item">
                <i class="fas fa-list"></i>
                <p className="list-name">{props.name}</p>
            </div>
        </NavLink>
    );
}

export default ListNavItem;