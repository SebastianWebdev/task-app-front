import './css/Nav.css'
import './css/NavMain.css'
import React from 'react'
import { NavLink } from 'react-router-dom'
import ListNavItem from "../components/ListNavItem;"
const NavMain = (props) => {
    const { lists, userName, addListHandler, handler } = props
    const ReactLists = lists.map(list => <ListNavItem key={list._id} name={list.tittle} id={list._id} handler={handler} />)

    return (
        <nav className=" nav nav2">
            <div className="nav-user"><img src="" alt="" /> <NavLink to="/user">{userName}</NavLink></div>
            {ReactLists}
            <button onClick={addListHandler} className="btn-rec" id="add-list">+</button>

        </nav>
    )
}
export default NavMain