import React, { Component } from 'react';
import './css/Main..css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavMain from "../layouts/NavMain"
class Main extends Component {
    state = {
        isLoaded: false
    }
    user = JSON.parse(sessionStorage.user)

    token = sessionStorage.accessToken ? sessionStorage.accessToken : localStorage.accessToken
    componentWillMount() {
        const listsURL = "https://sebastian-webdev-task-app.herokuapp.com/lists"
        fetch(listsURL, {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + this.token
            }
        }).then(res => {
            return res.json()
        }).then(res => {
            //console.log(res);
            this.lists = res
            //console.log(this.lists);
            this.setState({
                isLoaded: true
            })
        })
    }
    render() {
        //console.log(this.lists, "to jest lista z render");


        return (
            <Router>
                {this.state.isLoaded ?
                    <div className="main-wraper">
                        <NavMain lists={this.lists} userName={this.user.name} />
                        <Switch>
                        </Switch>

                    </div> : null}
            </Router>
        );
    }
}

export default Main;