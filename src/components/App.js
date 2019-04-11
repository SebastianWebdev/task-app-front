import React, { Component } from 'react';
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './components Css/App.css';
import { customFetch } from '../functions/fetch'
import { getTasks } from '../functions/getTasks'
import { getLists } from '../functions/getLists'
import Footer from '../layouts/Footer'
import { transformData } from '../functions/transformData'

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
    isReady: false,
    data: {}
  };
  token = sessionStorage.accessToken ? sessionStorage.accessToken : localStorage.accessToken
  onSub = async (e) => {
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
      const options = {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      }
      const url = "https://sebastian-webdev-task-app.herokuapp.com/users";
      try {
        await customFetch(url, options)

        this.setState({
          isRegistrationDone: true
        })

      }
      catch (e) {
        console.log(e);

      }
    } else if (e.target.id === "login") {
      const body = {
        email,
        password: pass
      }
      const url = "https://sebastian-webdev-task-app.herokuapp.com/users/login";
      const options = {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      }
      try {
        const loginRes = await customFetch(url, options)
        if (!rememberMe) {
          sessionStorage.setItem('accessToken', loginRes.token)

        } else {
          localStorage.setItem('accessToken', loginRes.token)
        }
        const user = loginRes.user
        sessionStorage.setItem('user', JSON.stringify(user))
        this.manageData()
        this.setState({
          isLogin: true
        })
        this.manageData("onSub", user)
        window.history.pushState({}, 'main', '/')

      } catch (e) {
        console.log(e);

      }


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
        isLogin: true,
        user
      })
      this.manageData("mount", user)
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
          isLogin: true,
          user: res
        })
        this.manageData("mount", user)
      }).catch(e => {
        console.log(e);
      })
    }

  }

  manageData = async (where, user = this.state.user) => {
    const token = this.token
    try {
      const tasks = await getTasks(token)
      const lists = await getLists(token)
      const data = transformData(tasks, lists)
      data.user = JSON.parse(user)
      this.setState({
        isReady: true,
        data
      })
    } catch (e) {
      console.log(e);

    }

    //console.log(token, user);



  }
  render() {


    const { isRegistrationDone, isReady, data } = this.state
    //const { nameValue, emailValue, passValue } = this.state.regValue
    const regValues = this.state.regValue
    return (
      <>

        <div className="app-wrapper">
          {this.state.isLogin ? <Main isReady={isReady} data={data} /> : <HomePage regValues={regValues} isRegistrationDone={isRegistrationDone} onChange={this.onChange} onSub={this.onSub} />}
          <Footer />
        </div>


      </>
    );
  }
}

export default App;
