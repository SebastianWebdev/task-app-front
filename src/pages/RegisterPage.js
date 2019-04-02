import React, { Component } from 'react';
import './css/Register.css'
const RegisterPage = (props) => {
    return (
        <div className="reg-log-wrapper">
            <h1>Stwórz Konto</h1>
            <form className="log-form" onSubmit={props.onSub}  >
                <label htmlFor="reg-name">Nazwa</label>
                <input onChange={props.handler} name="name" value={props.regValues.name} id="reg-name" placeholder="Podaj swoje imię i nazwisko" type="text" />
                <label htmlFor="reg-mail">Email</label>
                <input onChange={props.handler} name="email" value={props.regValues.email} id="reg-mail" placeholder="Podaj email" type="email" />
                <label htmlFor="reg-pass">Hasło</label>
                <input onChange={props.handler} name="pass" value={props.regValues.pass} id="reg-pass" placeholder="hasło" type="password" />
                <button type="submit" className="reg-sub">Stwórz nowe konto</button>
            </form>
        </div>
    )
}
export default RegisterPage