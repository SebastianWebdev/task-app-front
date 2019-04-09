import React, { Component } from 'react';
import './css/Main..css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavMain from "../layouts/NavMain"
import List from '../components/List'
import EmptyList from '../components/EmptyList'
class Main extends Component {
    state = {
        isLoaded: false,
        activeList: '',
        activeList_id: ''
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
            //console.log(res);
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
    navItemHandler = (e) => {
        //console.log(e.currentTarget.id);
        const activeList = e.currentTarget.id;
        this.setState({
            activeList
        })

    }
    render() {

        const { activeList } = this.state

        return (
            <Router>
                {this.state.isLoaded ?
                    <div className="main-wraper">
                        <NavMain lists={this.lists} userName={this.user.name} handler={this.navItemHandler} />
                        <Switch>
                            {activeList ? <Route path="/list" render={(props) => <List {...props} activeList={activeList} lists={this.lists} />} /> : <EmptyList />}
                        </Switch>

                    </div> : null}
            </Router>
        );
    }
}

export default Main;