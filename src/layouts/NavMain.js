import './css/Nav.css'
import './css/NavMain.css'
import React from 'react'
import { NavLink } from 'react-router-dom'
import List from "../components/List"
const NavMain = (props) => {
    const { lists, userName } = props
    const ReactLists = lists.map(list => <List key={list._id} name={list.tittle} />)


    console.log(ReactLists);

    return (
        <nav className=" nav nav2">
            <div className="nav-user"><img src="" alt="" /> <NavLink to="/user">{userName}</NavLink></div>
            {ReactLists}

        </nav>
    )
}
export default NavMain