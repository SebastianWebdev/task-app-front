import React from '../../node_modules/react'

const Login = (props) => {
    const data = props.props
    const loginStatus = data.loginStatus

    return (
        <div className="reg-log-wrapper">
            <h1>Zaloguj się do konta</h1>
            {loginStatus === '400' ? <h2 className="login-alert">Zły login lub hasło</h2> : null}
            <form className="log-form" id="login" onSubmit={data.onSub}  >
                <label htmlFor="reg-mail">Email</label>
                <input onChange={data.handler} name="email" value={data.regValues.email} id="reg-mail" placeholder="Podaj email" type="email" />
                <label htmlFor="reg-pass">Hasło</label>
                <input onChange={data.handler} name="pass" value={data.regValues.pass} id="reg-pass" placeholder="hasło" type="password" />
                <label htmlFor="rememberMe">Zapamiętaj mnie</label>
                <input onChange={data.handler} type="checkbox" id="rememberMe" name="rememberMe" />
                <button type="submit" className="reg-sub">Zaloguj się</button>
            </form>
        </div >
    )
}
export default Login