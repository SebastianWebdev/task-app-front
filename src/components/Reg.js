import React from 'react'
const Register = (props) => {
    const data = props.props
    return (
        <div className="reg-log-wrapper">
            <h1>Stwórz Konto</h1>
            <form className="log-form" id="reg" onSubmit={data.onSub}  >
                <label htmlFor="reg-name">Nazwa</label>
                <input onChange={data.handler} name="name" value={data.regValues.name} id="reg-name" placeholder="Podaj swoje imię i nazwisko" type="text" />
                <label htmlFor="reg-mail">Email</label>
                <input onChange={data.handler} name="email" value={data.regValues.email} id="reg-mail" placeholder="Podaj email" type="email" />
                <label htmlFor="reg-pass">Hasło</label>
                <input onChange={data.handler} name="pass" value={data.regValues.pass} id="reg-pass" placeholder="hasło" type="password" />
                <button type="submit" className="reg-sub">Stwórz nowe konto</button>
            </form>
        </div>
    )
}
export default Register