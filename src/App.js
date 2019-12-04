import React, { Component } from 'react'
import { CssBaseline, Container, TextField } from '@material-ui/core'
import TaskList from './components/TaskList'

class App extends Component {
  state = {
    task: '',
    todo: [],
  }

  fieldHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  enterHandler = (e) => {
    if (e.key === 'Enter') {
      let value = this.state[e.target.name];
      let newTodo = [value, ...this.state.todo]
      this.setState({ [e.target.name]: '', todo: newTodo });
      console.log(this.state.todo)
    }
  }

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
        <TaskList data={this.state.todo} />
      </Container>
    )
  }
}

export default App;
