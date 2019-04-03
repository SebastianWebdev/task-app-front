import React from 'react';
import Login from '../components/Login'
import Nav from '../layouts/Nav'
const LoginPage = (props) => {
    const location = "login"
    return (
        <>
            <Nav where={location}></Nav>
            <Login props={props} />
        </>
        // !props.isRegistrationDone ? <Login props={props} /> : <NextReg />
    )
}
export default LoginPage