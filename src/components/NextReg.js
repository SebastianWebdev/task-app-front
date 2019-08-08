import React from '../../node_modules/react'
import { Link } from '../../node_modules/react-router-dom'
// This component is a simple message after user registration
const NextReg = (props) => {
    return (
        <div className="reg-log-wrapper">
            <h1>Konto zostało zarejestrowane</h1>
            <Link to="/login" className="postreg-link" >Możesz się zalogować</Link>
        </div>
    )
}
export default NextReg