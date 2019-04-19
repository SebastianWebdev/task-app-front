import React from '../../node_modules/react';
import './css/Register.css'
import Register from "../components/Reg"
import NextReg from "../components/NextReg"
import Nav from "../layouts/Nav"
const RegisterPage = (props) => {
    const location = "reg"
    return (
        <>
            <Nav where={location}></Nav>
            {!props.isRegistrationDone ? <Register props={props} /> : <NextReg />}
        </>
    )
}
export default RegisterPage