import React, { Component } from '../../node_modules/react';
import './components Css/App.css';
import { customFetch } from '../functions/fetch'
import { getTasks } from '../functions/getTasks'
import { getLists } from '../functions/getLists'
import Footer from '../layouts/Footer'
import { transformData } from '../functions/transformData'
import createTask from '../functions/createTask'
import findListAndTask from '../functions/findListAndTask'
import copyData from '../functions/copyData'
import createList from '../functions/createList'
import updateDB from '../functions/updateDB'
import { updateTask } from '../functions/updateTask'
import HomePage from '../pages/WelcomePage'
import Main from '../pages/Main'
import Loading from './Loading'
import validateId from '../functions/typeof_id'
class App extends Component {
  state = {
    regValue: {
      name: "",
      email: "",
      pass: "",
    },
    rememberMe: false,
    isRegistrationDone: false,
    isLogin: false,
    isReady: false,
    isload: false,
    loginStatus: '',
    data: {},
    activeTask: {
      task: {}
    },
    activeTaskInputs: {
      name: '',
      description: ''
    },
    activeListInputs: {
      tittle: '',
      description: ''
    },
    userInputs: {
      name: "",
      email: ""
    },
    isUserEddited: false,
    isListEddited: false
  };
  onSub = async (e) => {
    e.preventDefault()
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
        this.setState({
          isLogin: true,
          loginStatus: '200'
        })
        this.manageData("onSub", user)
        window.history.pushState({}, 'main', '/')
      } catch (e) {
        if (e.message === '400') {
          this.setState({ loginStatus: '400' })
        }
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
          },
        }))
        break;
      case "reg-mail":
        this.setState(prev => ({
          regValue: {
            name: prev.regValue.name,
            email: value,
            pass: prev.regValue.pass
          },
          loginStatus: ""
        }))
        break;
      case "reg-pass":
        this.setState(prev => ({
          regValue: {
            name: prev.regValue.name,
            email: prev.regValue.email,
            pass: value
          },
          loginStatus: ""
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
        user: JSON.parse(user)
      })
      this.manageData("mount", user).then(res => {
        this.setState({
          userInputs: {
            name: res.user.name,
            email: res.user.email
          },
          isload: true
        })
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
          isLogin: true,
          user: res
        })
        const user2 = sessionStorage.getItem('user')
        this.manageData("mount", user2).then(res => {
          this.setState({
            userInputs: {
              name: res.user.name,
              email: res.user.email
            },
            isload: true
          })
        })
      }).catch(e => {
        console.log(e);
      })
    } else {
      this.setState({
        isload: true
      })
    }
  }
  setNewAvatarToLocaState = (avatar) => {
    const data = { ...this.state.data }
    data.user.avatar = avatar
    this.setState({
      data
    })
  }
  manageData = async (where, user = this.state.user) => {
    const token = sessionStorage.accessToken ? sessionStorage.accessToken : localStorage.accessToken
    let userObj = user
    try {
      if (typeof user === 'string') {
        userObj = JSON.parse(user)
      }
      const userAvatar = `data:image/jpg;base64,${userObj.avatar}`
      userObj.avatar = userAvatar
      const tasks = await getTasks(token)
      const lists = await getLists(token)
      const data = transformData(tasks, lists)
      data.user = userObj
      this.setState({
        isReady: true,
        data
      })
      return data
    } catch (e) {
      console.log(e);
    }
  }
  stageTaskHandler = (e) => {
    const _id = e.currentTarget.parentNode.id
    const listId = e.currentTarget.parentNode.dataset.listid
    const listIndex = this.state.data.lists.findIndex(list => list._id === listId)
    const taskIndex = this.state.data.lists[listIndex].tasks.findIndex(task => task._id === _id)
    const data = { ...this.state.data }
    const modTask = data.lists[listIndex].tasks[taskIndex]
    if (modTask.stage === 1 || modTask.stage === 2) {
      data.lists[listIndex].tasks[taskIndex].stage += 1
    }
    this.setState({ data })
    const body = {
      stage: data.lists[listIndex].tasks[taskIndex].stage
    }
    const url = 'https://sebastian-webdev-task-app.herokuapp.com/tasks/'
    updateTask(url, _id, body)
  }
  addTaskHandler = (e) => {
    const data = { ...this.state.data }
    const listId = e.target.id
    const listIndex = data.lists.findIndex(list => list._id === listId)
    const owner = this.state.data.user._id
    const newTask = createTask(listId, owner)
    data.lists[listIndex].tasks.push(newTask)
    this.setState({ data })
    const url = `https://sebastian-webdev-task-app.herokuapp.com/tasks`
    const body = {
      name: newTask.name,
      description: newTask.description,
      list_id: newTask.list,
      temp_Id: newTask.temp_Id
    }
    customFetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-Type": "application/json",
        'Authorization': `Bearer ${sessionStorage.accessToken ? sessionStorage.accessToken : localStorage.accessToken}`
      },
      body: JSON.stringify(body)
    }).then(res => {
      const data = { ...this.state.data }
      const taskIndex = data.lists[listIndex].tasks.findIndex(t => t.temp_Id === res.temp_Id)
      data.lists[listIndex].tasks[taskIndex]._id = res._id
      data.lists[listIndex].tasks[taskIndex].createdAt = res.createdAt
      data.lists[listIndex].tasks[taskIndex].updatedAt = res.updatedAt
      this.setState({
        data
      })
    })
  }
  addListHandler = (e) => {
    const newData = copyData(this.state.data)
    const owner = this.state.data.user._id
    const newList = createList(owner)
    newData.lists.push(newList)
    this.setState({ data: newData })
    const url = `https://sebastian-webdev-task-app.herokuapp.com/lists`
    const body = {
      tittle: newList.tittle,
      description: newList.description,
      temp_id: newList.temp_id
    }
    customFetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-Type": "application/json",
        'Authorization': `Bearer ${sessionStorage.accessToken ? sessionStorage.accessToken : localStorage.accessToken}`
      },
      body: JSON.stringify(body)
    }).then(res => {
      const data = { ...this.state.data }
      const listIndex = data.lists.findIndex(list => list.temp_id === res.temp_id)
      data.lists[listIndex]._id = res._id
      data.lists[listIndex].createdAt = res.createdAt
      data.lists[listIndex].updatedAt = res.updatedAt
      this.setState({ data })
    })
  }
  fullTaskHandler = (e) => {
    const data = { ...this.state.data }
    e.persist()
    if (e.currentTarget.dataset.type === "taskSmall" && e.target.dataset.type !== "move") {
      const listId = e.currentTarget.dataset.listid
      const taskId = e.currentTarget.id
      const work = findListAndTask(listId, taskId, data)
      this.setState({
        activeTask: work,
        activeTaskInputs: {
          name: work.task.name,
          description: work.task.description
        }
      })
    } else {
      const data = { ...this.state.data }
      const task = { ...this.state.activeTask }
      if (e.target.name === 'name') {
        this.setState(prev => ({
          activeTaskInputs: {
            name: e.target.value,
            description: prev.activeTaskInputs.description
          }
        }))
      } else if (e.target.name === 'description') {
        this.setState(prev => ({
          activeTaskInputs: {
            name: prev.activeTaskInputs.name,
            description: e.target.value
          }
        }))
      }
      if (e.target.dataset.type === 'save') {
        const newValues = { ...this.state.activeTaskInputs }
        if (!newValues.name) {
          alert("Task musi mieć jakąś nazwę")
        } else {
          task.task.name = newValues.name
          task.task.description = newValues.description
          this.setState({ activeTask: { task: {} } })
          const body = {
            name: newValues.name,
            description: newValues.description
          }
          const id = task.task._id
          const url = 'https://sebastian-webdev-task-app.herokuapp.com/tasks/'
          updateTask(url, id, body)
        }
      } else if (e.currentTarget.dataset.name === "close") {
        this.setState({ activeTask: { task: {} } })
      } else if (e.target.dataset.type === "delete") {
        const confirm = window.confirm('Zadanie zostanie usuniętę, czy napewno chcesz?')
        if (confirm) {
          const listIndex = task.listIndex
          const taskIndex = task.taskIndex
          const id = data.lists[listIndex].tasks[taskIndex]._id
          const url = `https://sebastian-webdev-task-app.herokuapp.com/tasks/${id}`
          const options = {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              "Content-Type": "application/json",
              'Authorization': `Bearer ${sessionStorage.accessToken ? sessionStorage.accessToken : localStorage.accessToken}`
            }
          }
          customFetch(url, options).then(res => {
          })
          data.lists[listIndex].tasks.splice(taskIndex, 1)
          this.setState({ data: data, activeTask: { task: {} } })
        }
      }
    }
  }
  listInputsHandler = (e) => {
    const newData = copyData(this.state.data)
    const ListId = e.target.dataset.listid
    const listIndex = newData.lists.findIndex(list => list._id === ListId)
    const value = e.target.value
    const newActiveList = copyData(this.state.activeList)
    this.setState({ isListEddited: true })
    if (e.type === "change") {
      if (e.target.name === "list-tittle") {
        this.setState(prev => ({
          activeListInputs: {
            tittle: value,
            description: prev.activeListInputs.description
          }
        }))
      } else {
        this.setState(prev => ({
          activeListInputs: {
            tittle: prev.activeListInputs.tittle,
            description: value
          }
        }))
      }
    } else if (e.type === "click") {
      const newTittle = this.state.activeListInputs.tittle
      const newDesc = this.state.activeListInputs.description
      newActiveList[0].tittle = newTittle
      newData.lists[listIndex].tittle = newTittle
      newData.lists[listIndex].description = newDesc

      if (!newTittle) {
        alert("Nazwa jest wymagana")
      } else {
        this.setState({
          activeList: newActiveList,
          activeListName: newTittle,
          data: newData,
          isListEddited: false

        })

        const url = `https://sebastian-webdev-task-app.herokuapp.com/lists/${ListId}`
        const body = {
          tittle: newTittle,
          description: newDesc
        }
        updateDB(url, body)

      }
    }


  }
  setActiveList = e => {
    if (e.target.id !== 'delete-list') {
      const activeListName = e.currentTarget.name;
      const activeListId = e.currentTarget.id
      let activeList = []
      if (validateId(activeListId)) {
        activeList = this.state.data.lists.filter(list => list.temp_id === activeListId * 1)
      } else {
        activeList = this.state.data.lists.filter(list => list._id === activeListId)
      }
      const inputs = {
        tittle: activeListName,
        description: activeList[0].description
      }
      this.setState({
        activeListName,
        activeList,
        activeListId,
        activeListInputs: inputs
      })
    }
  }
  userInputsHandler = e => {
    const type = e.target.dataset.type
    const value = e.target.value
    if (type === "name") {
      this.setState(prev => ({
        userInputs: {
          name: value,
          email: prev.userInputs.email
        },
        isUserEddited: true
      }))
    } else {
      this.setState(prev => ({
        userInputs: {
          name: prev.userInputs.name,
          email: value
        },
        isUserEddited: true
      }))
    }
  }
  userSaveHandler = e => {
    const newName = this.state.userInputs.name
    const newData = copyData(this.state.data)
    newData.user.name = newName
    this.setState({
      data: newData
    })
    this.userResetInputs(newData)
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
    const url = "https://sebastian-webdev-task-app.herokuapp.com/users/update"
    const body = { name: newName }
    const options = {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    }
    customFetch(url, options).catch(e => {
      console.log(e);
    })

  }
  userResetInputs = (data) => {
    if (data) {
      this.setState({
        userInputs: {
          name: data.user.name,
          email: data.user.email
        },
        isUserEddited: false
      })
    } else {
      this.setState({
        userInputs: {
          name: this.state.data.user.name,
          email: this.state.data.user.email
        },
        isUserEddited: false
      })
    }

  }
  deleteList = e => {
    e.preventDefault()
    const id = e.target.dataset.listid
    const url = `https://sebastian-webdev-task-app.herokuapp.com/lists/${id}`
    const options = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-Type": "application/json",
        'Authorization': `Bearer ${sessionStorage.accessToken ? sessionStorage.accessToken : localStorage.accessToken}`
      }
    }
    if (window.confirm("Czy na pewno chcesz usunąć listę?")) {
      const data = { ...this.state.data }
      const listIndex = data.lists.findIndex(list => list._id === id)
      data.lists.splice(listIndex, 1)
      this.setState({ data })
      customFetch(url, options)
    }
  }
  logOutHandler = e => {
    const url = `https://sebastian-webdev-task-app.herokuapp.com/users/logout`
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-Type": "application/json",
        'Authorization': `Bearer ${sessionStorage.accessToken ? sessionStorage.accessToken : localStorage.accessToken}`
      }
    }
    fetch(url, options).then(res => {
      window.history.pushState({}, 'main', '/')
      this.setState({
        isLogin: false,
        isReady: false,
        activeList: [],
        activeListId: '',
        activeListName: '',
        data: {},
        loginStatus: ""
      })
      sessionStorage.clear()
      localStorage.clear()
    }).catch(e => {
      console.log(e);
    })
  }
  handlers = {
    stageTaskHandler: this.stageTaskHandler,
    addTaskHandler: this.addTaskHandler,
    fullTaskHandler: this.fullTaskHandler,
    addListHandler: this.addListHandler,
    listInputsHandler: this.listInputsHandler,
    setActiveList: this.setActiveList,
    userInputsHandler: this.userInputsHandler,
    userSaveHandler: this.userSaveHandler,
    userResetInputs: this.userResetInputs,
    setNewAvatarToLocaState: this.setNewAvatarToLocaState,
    deleteList: this.deleteList,
    logOutHandler: this.logOutHandler
  }
  render() {
    const { isRegistrationDone, isReady, data, activeTask, activeTaskInputs, activeListInputs, activeListName, activeList, activeListId, isUserEddited, userInputs, isListEddited, loginStatus, isload } = this.state
    const regValues = this.state.regValue
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
    if (isload) {
      return (
        <div className="app-wrapper">
          {this.state.isReady ? <Main token={token} activeListId={activeListId} activeList={activeList} activeListName={activeListName} activeListInputs={activeListInputs} activeTask={activeTask} handlers={this.handlers} isReady={isReady} data={data} activeTaskInputs={activeTaskInputs} userInputs={userInputs} isUserEddited={isUserEddited} isListEddited={isListEddited} /> : <HomePage regValues={regValues} isRegistrationDone={isRegistrationDone} onChange={this.onChange} onSub={this.onSub}
            loginStatus={loginStatus} />}
          <Footer />
        </div>
      )
    } else {
      return (
        <Loading />
      )
    }
  }
}

export default App;
