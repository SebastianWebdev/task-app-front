import React, { Component } from "react"
import "./components Css/List.css"
import { customFetch } from '../functions/fetch'
import { updateTask } from "../functions/updateTask"
import Task from './Task'
import { taskFilter } from '../functions/filterTasks'
import TaskFull from '../components/TaskFull'
import { deleteTask } from '../functions/deleteTask'
class List extends Component {
    state = {
        activeListName: '',
        isAddTaskActive: false,
        activeTaskStage: '',
        activeTask: {}

    }

    tasks = []

    activeList = []

    stageHandler = (e) => {
        //e.persist()
        console.log(e, "event z stage");



        const _id = e.currentTarget.parentNode.id
        console.log(_id, 'Id w stage handler');
        const url = 'https://sebastian-webdev-task-app.herokuapp.com/tasks/'
        const ListUrl = `https://sebastian-webdev-task-app.herokuapp.com/tasks/list/`
        //const finalUrl = url + _id
        const dataStage = e.currentTarget.parentNode.dataset.stage
        //console.log(dataStage);

        if (dataStage === '1') {
            const body = { stage: '2' }
            //console.log("pierwszy if działa");
            updateTask(url, _id, body).then(this.getTasks(ListUrl)).then(this.setState({ state: this.state }))
        } else if (dataStage === '2') {
            //console.log("drugi if działa");
            const body = { stage: 3 }
            updateTask(url, _id, body).then(this.getTasks(ListUrl)).then(this.setState({ state: this.state }))
        }
    }
    setActievList = () => {
        const {
            props
        } = this
        const activeList = props.lists.filter(list => list.tittle === props.activeList)[0]
        this.activeList = []
        this.activeList = activeList
        if (this.state.activeListName !== activeList.tittle) {
            this.setState({ activeListName: activeList.tittle })
        }


    }
    componentWillMount() {
        this.setActievList()
        const url = `https://sebastian-webdev-task-app.herokuapp.com/tasks/list/`

        this.getTasks(url).then(res => {
            this.setState({ tasks: res })
        })



    }

    componentWillUpdate() {
        const url = `https://sebastian-webdev-task-app.herokuapp.com/tasks/list/`
        //console.log(this.props.activeList, 'lista z will update');
        //console.log('component will update');
        console.log('component will update');

        this.getTasks(url).then(res => {
            const prevTasks = this.state.tasks

            if (res.length === prevTasks.length) {
                // console.log('get tasks z will update', res);
                console.log('Działa pierwszy if');

                const prevTasksStringify = JSON.stringify(this.state.tasks)
                const resStringify = JSON.stringify(res)
                let isEqual = prevTasksStringify === resStringify

                if (!isEqual) {
                    this.setState({ tasks: res })
                }
            } else {
                console.log("działa if w will update");
                this.setState({ tasks: res })
            }



        })


    }
    componentDidUpdate() {

        //const url = `https://sebastian-webdev-task-app.herokuapp.com/tasks/list/`
        this.setActievList()

        //console.log(this.activeList, 'lista z didUpdate');

    }
    addTask = async (e) => {
        //console.log(this.activeList);
        const body = { description: "Empty Task", name: "Task Name", stage: 1, list_id: this.activeList._id }
        const options = {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Content-Type": "application/json",
                'Authorization': ""
            },
            body: JSON.stringify(body)
        }
        const token = sessionStorage.accessToken ? sessionStorage.accessToken : localStorage.accessToken
        const authOption = 'Bearer ' + token
        if (!options.headers.Authorization) {
            options.headers.Authorization = authOption
        }
        const url = `https://sebastian-webdev-task-app.herokuapp.com/tasks`
        const ListUrl = `https://sebastian-webdev-task-app.herokuapp.com/tasks/list/`


        try {
            const res = await customFetch(url, options)
            console.log(res);

            if (res) {
                await this.getTasks(ListUrl)
                this.setState({ state: this.state })
                console.log(res, "res z add task");


            }
        } catch (e) {
            console.log(e);

        }



    }
    fullTaskHandler = (e) => {
        e.persist()
        // console.log(e.currentTarget);
        const { _id, name, description } = this.state.activeTask
        const body = { name, description }
        const url = 'https://sebastian-webdev-task-app.herokuapp.com/tasks/'
        const ListUrl = `https://sebastian-webdev-task-app.herokuapp.com/tasks/list/`
        // console.log(e.target.dataset.type !== "move", "e target czy się róna");

        if (e.currentTarget.dataset.type === "taskSmall" && e.target.dataset.type !== "move") {
            const _id = e.currentTarget.id
            const task = this.state.tasks.filter(task => task._id === _id)[0]
            const stage = task.stage
            this.setState({
                activeTaskStage: stage,
                activeTask: task
            })
        } else {
            const value = e.target.value
            // console.log(e.target.name);
            if (e.target.name === "name") {
                this.setState(prev => ({
                    activeTask: {
                        ...prev.activeTask,
                        name: value
                    }
                }))
            } else if (e.target.name === "description") {
                this.setState(prev => ({
                    activeTask: {
                        ...prev.activeTask,
                        description: value
                    }
                }))
            } else if (e.currentTarget.dataset.name === 'close') {
                //console.log(e.currentTarget);
                this.setState({
                    activeTaskStage: "",
                    activeTask: {}
                })

            } else if (e.target.dataset.type === "save") {
                // console.log(e.target);

                updateTask(url, _id, body).then(this.setState({
                    activeTaskStage: "",
                    activeTask: {}
                }))

            } else if (e.target.dataset.type === "delete") {
                console.log(e.target);
                alert('Czy usunąć?')
                deleteTask(_id).then(this.setState({
                    activeTaskStage: "",
                    activeTask: {}
                }))
            }

        }



    }

    render() {
        const {
            props
        } = this
        const { tasks, activeTaskStage, activeTask } = this.state
        const { stageHandler, addTask, fullTaskHandler } = this

        const filteredTasks = taskFilter(tasks, this.state.tasks)
        const { stage1, stage2, stage3 } = filteredTasks
        const stage1Map = stage1.map(e => <Task fullTaskHandler={fullTaskHandler} stageHandler={stageHandler} key={e._id} tittle={e.name} body={e.description} stage={e.stage} _id={e._id} />)
        const stage2Map = stage2.map(e => <Task fullTaskHandler={fullTaskHandler} stageHandler={stageHandler} key={e._id} tittle={e.name} body={e.description} stage={e.stage} _id={e._id} />)
        const stage3Map = stage3.map(e => <Task fullTaskHandler={fullTaskHandler} stageHandler={stageHandler} key={e._id} tittle={e.name} body={e.description} stage={e.stage} _id={e._id} />)



        return (<div className="app-window-box box-full" >
            <h1 className="task-name" > {this.state.activeListName} </h1>
            <div className="tasks-wrapper">
                <div className="stag1 tasks-box">

                    <h2 className="stage-name">To Do</h2>{stage1Map}
                    <div className="tasks-footer">
                        <button onClick={addTask} className="add-task-btn btn-rec">Add</button>
                    </div>
                    {activeTask && activeTaskStage === 1 ? <TaskFull handler={fullTaskHandler} task={activeTask} /> : null}
                </div>
                <div className="stag2 tasks-box"><h2 className="stage-name" >W trakcie</h2>{stage2Map}
                    {activeTask && activeTaskStage === 2 ? <TaskFull handler={fullTaskHandler} task={activeTask} /> : null}
                </div>
                <div className="stag3 tasks-box"><h2 className="stage-name">Zrobione</h2>{stage3Map}
                    {activeTask && activeTaskStage === 3 ? <TaskFull handler={fullTaskHandler} task={activeTask} /> : null}
                </div>
            </div>

        </div >

        );
    }
}

export default List;