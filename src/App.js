import React, { Component } from 'react'
import { CssBaseline, Container, TextField } from '@material-ui/core'
import TaskList from './components/TaskList'
import IdGen from './helpers/idGen'

class App extends Component {
  state = {
    task: '',
    todo: [],
  }

  fieldHandler = (e) => this.setState({ [e.target.name]: e.target.value })
  enterHandler = (e) => {
    if (e.key === 'Enter' && this.state.hasOwnProperty(e.target.name)) this.saveTask(e.target.name)
  }

  saveTask = (field) => {
    let value = this.state[field];
    let newTodo = [...this.state.todo, { id: IdGen(), text: value, status: 'pending' }]
    this.setState({ [field]: '', todo: newTodo });
  }
  changeStatus = (id) => {
    let newTodo = [...this.state.todo]
    let task = newTodo.find((e) => e.id === id)
    task.status = task.status === 'pending' ? 'complete' : 'pending'
    this.setState({ todo: newTodo })
  }

  deleteTask = (id) => {
    let newTodo = [...this.state.todo]
    let task = newTodo.find((e) => e.id === id)
    newTodo.splice(newTodo.indexOf(task), 1)
    this.setState({ todo: newTodo })
  }

  componentDidMount = () => {
    const persistedState = window.localStorage.getItem('todo-state')
    this.setState({ ...(JSON.parse(persistedState)) || { todo: ''} })

  }

  componentDidUpdate = () => {
    let persisted = this.state.todo
    window.localStorage.setItem('todo-state', JSON.stringify(persisted))
  }

  render() {
    const complete = [...this.state.todo.filter((e) => e.status === 'complete')]
    const pending = [...this.state.todo.filter((e) => e.status === 'pending')]
    return (
      <Container>
        <CssBaseline />
        <h1>To-Do List</h1>
        <TextField
          label={'task'}
          name={'task'}
          variant={'outlined'}
          value={this.state.task}
          onChange={(e) => this.fieldHandler(e)}
          onKeyPress={(e) => this.enterHandler(e)}
        >
        </TextField>
        <TaskList
          title={'Pendientes'}
          tag={'(___)'}
          data={pending}
          changeStatus={this.changeStatus}
          deleteTask={this.deleteTask}
        />
        <TaskList
          title={'Completadas'}
          tag={'( X )'}
          data={complete}
          changeStatus={this.changeStatus}
          deleteTask={this.deleteTask}
        />
      </Container>
    )
  }
}

export default App;
