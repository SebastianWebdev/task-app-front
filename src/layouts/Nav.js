import './css/Nav.css'
import React from 'react'
import {
    NavLink
} from 'react-router-dom'
const Nav = (props) => {

    return (
        <nav className=" nav nav1" >
            < div className="logo-wrap" >< h1 className="logo" >Logo</h1>
            </div >
            {!props.isMain ? <div className="buttons" > {props.where === "login" ? < div className="btn" > < NavLink to="register" > Register </NavLink></div > : <div className="btn" > < NavLink to="login" > Login </NavLink></div >} </div> : <div className="buttons"> <div className="btn" > < NavLink to="register" > Register </NavLink></div ><div className="btn" > < NavLink to="login" > Login </NavLink></div ></div>
            }
        </nav>
    )
}
export default Nav