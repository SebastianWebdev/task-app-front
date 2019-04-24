import React, { Component } from 'react';
import './css/Main..css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavMain from "../layouts/NavMain"
import ListHooks from '../components/ListHooks'
import EmptyList from '../components/EmptyList'
import User from '../components/User'
import LogOut from '../components/LogOut'
class Main extends Component {
    state = {
        isLoaded: false,
    }
    user = { ...this.props.data.user }

    render() {
        const { isReady, data, activeTask, activeTaskInputs, handlers, activeListInputs, activeListName, activeList, activeListId, isUserEddited, userInputs, token, isListEddited } = this.props
        console.log(activeListId);

        return (
            <Router>
                {isReady ?
                    <div className="main-wraper">
                        <NavMain lists={data.lists} avatar={data.user.avatar} userName={data.user.name} handler={handlers.setActiveList} addListHandler={handlers.addListHandler} deleteList={handlers.deleteList} />
                        <Switch>
                            <Route path="/list" render={(props) => (activeListId ? <ListHooks {...props} activeListInputs={activeListInputs} handlers={handlers} activeListName={activeListName} lists={data.lists} activeTask={activeTask} activeList={activeList} activeTaskInputs={activeTaskInputs} isListEddited={isListEddited} /> : <EmptyList />)} />
                            <Route path='/user' render={(props) => <User {...props} user={data.user} handlers={handlers} userInputs={userInputs} isUserEddited={isUserEddited} token={token} />} />
                        </Switch>
                        <LogOut logOutHandler={handlers.logOutHandler} />
                    </div> : null}
            </Router>
        );
    }
}

export default Main;