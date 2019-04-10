import React, { Component } from 'react';
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './components Css/App.css';

import Footer from '../layouts/Footer'

import HomePage from '../pages/WelcomePage'

import Main from '../pages/Main'
class App extends Component {
  state = {
    version: 1, // usunąć
    regValue: {   //zmienić nazwę na formData
      name: "",
      email: "",
      pass: "",
    },
    rememberMe: false,

    isRegistrationDone: false,//zmianieć nazwę na is validate
    isLogin: false,
  };
  onSub = (e) => {
    e.preventDefault()
    //console.log(e.target.id);
    const { name, email, pass, } = this.state.regValue
    const { rememberMe } = this.state

    if (e.target.id === 'reg') {


      const body = {
        name,
        email,
        password: pass
      }
      const url = "https://sebastian-webdev-task-app.herokuapp.com/users";
      fetch(url, {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      }).then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      }

      ).then(res => {
        this.setState({
          isRegistrationDone: true
        })

      }).catch(e => {
        console.log(e);
      })
    } else if (e.target.id === "login") {
      const body = {
        email,
        password: pass
      }
      const url = "https://sebastian-webdev-task-app.herokuapp.com/users/login";
      fetch(url, {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      }).then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      }

      ).then(res => {
        // console.log(res.user);

        if (!rememberMe) {
          sessionStorage.setItem('accessToken', res.token)

        } else {
          localStorage.setItem('accessToken', res.token)
        }
        const user = res.user
        sessionStorage.setItem('user', JSON.stringify(user))
        this.setState({

          isLogin: true
        })
        window.history.pushState({}, 'main', '/')

      }).catch(e => {
        console.log(e);
      })
    }
  }
  onChange = (e) => {
    const value = e.target.value
    switch (e.target.id) {
      case "reg-name":
        this.setState(prev => ({
          regValue: {
            name: value,
            email: prev.regValue.email,
            pass: prev.regValue.pass
          }
        }))

        break;
      case "reg-mail":
        this.setState(prev => ({
          regValue: {
            name: prev.regValue.name,
            email: value,
            pass: prev.regValue.pass
          }
        }))

        break;
      case "reg-pass":
        this.setState(prev => ({
          regValue: {
            name: prev.regValue.name,
            email: prev.regValue.email,
            pass: value
          }
        }))

        break;
      case "rememberMe":
        this.setState(prev => ({
          rememberMe: !prev.rememberMe
        }))
        break;
      default:

    }

  }
  componentWillMount() {
    const token = localStorage.getItem('accessToken')
    const user = sessionStorage.getItem('user')

    if (user) {
      this.setState({
        isLogin: true
      })
    } else if (token) {
      const url = "https://sebastian-webdev-task-app.herokuapp.com/users/me";
      fetch(url, {
        method: 'get',
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
      }).then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      }

      ).then(res => {

        sessionStorage.setItem('user', JSON.stringify(res))
        this.setState({
          isLogin: true
        })

      }).catch(e => {
        console.log(e);
      })
    }
  }

  render() {
    const { isRegistrationDone } = this.state
    //const { nameValue, emailValue, passValue } = this.state.regValue
    const regValues = this.state.regValue
    return (
      <>

        <div className="app-wrapper">
          {this.state.isLogin ? <Main /> : <HomePage regValues={regValues} isRegistrationDone={isRegistrationDone} onChange={this.onChange} onSub={this.onSub} />}
          <Footer />
        </div>


      </>
    );
  }
}

export default App;
