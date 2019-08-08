import './css/Welcome.css';
import React, { Component } from '../../node_modules/react';
import Nav from '../layouts/Nav'
import Welcome from '../layouts/Welcome'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import { BrowserRouter as Router, Switch, Route } from '../../node_modules/react-router-dom'

class HomePage extends Component {
    state = {}
    render() {
        const { regValues, isRegistrationDone, loginStatus } = this.props
        return (
            <Router basename={process.env.PUBLIC_URL}>
                <>
                    <Nav isMain={true} />
                    <Switch>

                        <Route path="/login" render={(props) => <LoginPage {...props} regValues={regValues} handler={this.props.onChange} onSub={this.props.onSub} isRegistrationDone={isRegistrationDone} loginStatus={loginStatus} />} />
                        <Route path="/register" render={(props) => <RegisterPage {...props} regValues={regValues} handler={this.props.onChange} onSub={this.props.onSub} isRegistrationDone={isRegistrationDone} />} />
                        <Route path="/" component={Welcome} />
                    </Switch>
                </>
            </Router>
        );
    }
}

export default HomePage;