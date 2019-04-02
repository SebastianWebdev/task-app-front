import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './components Css/App.css';
//import Login from './Login'
import Footer from '../layouts/Footer'

import HomePage from '../pages/WelcomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

class App extends Component {
  state = {
    version: 1,
    regValue: {
      name: "",
      email: "",
      pass: "",
    }

  };
  onSub = (e) => {
    e.preventDefault()
    console.log(e);
    const { name, email, pass } = this.state.regValue
    const body = {
      name,
      email,
      password: pass
    }
    console.log(JSON.stringify(body));

    const url = "https://sebastian-webdev-task-app.herokuapp.com/users";
    fetch(url, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify(body)
    }).then(res => {
      res.json()
    }).then(data => {
      console.log(data);

    }).catch(e => {
      console.log(e);

    })
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

      default:
        break;
    }

  }
  render() {
    //const { version } = this.state
    //const { nameValue, emailValue, passValue } = this.state.regValue
    const regValues = this.state.regValue
    return (
      <>
        <Router>
          <div className="app-wrapper">

            <Switch>
              <Route path="/" exact render={(props) => <HomePage {...props} regValues={regValues} />} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" render={(props) => <RegisterPage {...props} regValues={regValues} handler={this.onChange} onSub={this.onSub} />} />
            </Switch>
          </div>
        </Router>
        <Footer />
      </>
    );
  }
}

export default App;
