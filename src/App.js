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

  filterTask = (status) => [...this.state.todo.filter((e) => e.status === status)]

  render() {
    return (
      <Container>
        <CssBaseline />
        <h1>To-Do</h1>
        <TextField
          label={'task'}
          name={'task'}
          variant={'outlined'}
          value={this.state.task}
          onChange={(e) => this.fieldHandler(e)}
          onKeyPress={(e) => this.enterHandler(e)}
        >
        </TextField>
        <h3>Pending</h3>
        <TaskList data={this.filterTask('pending')} changeStatus={this.changeStatus} />
        <h3>Complete</h3>
        <TaskList data={this.filterTask('complete')} changeStatus={this.changeStatus} />
      </Container>
    )
  }
}

export default App;
