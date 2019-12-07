import React, { Component } from 'react'
import { CssBaseline, Container, TextField, } from '@material-ui/core'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core'
import TaskList from './components/TaskList'
import IdGen from './helpers/idGen'

class App extends Component {
  state = {
    currentTask: '',
    editField: '',
    isModalOpen: false,
    task: '',
    todo: [],
  }

  changeStatus = (id) => {
    let newTodo = [...this.state.todo]
    let task = newTodo.find((e) => e.id === id)
    task.status = task.status === 'pending' ? 'complete' : 'pending'
    this.setState({ todo: newTodo })
  }

  componentDidMount = () => {
    const persistedState = window.localStorage.getItem('todo-state')
    this.setState({ ...(JSON.parse(persistedState) || { todo: [] }) })
  }

  componentDidUpdate = () => {
    let { todo } = this.state
    let persisted = { todo }
    window.localStorage.setItem('todo-state', JSON.stringify(persisted))
  }

  deleteTask = (id) => {
    let newTodo = [...this.state.todo]
    let task = newTodo.find((e) => e.id === id)
    newTodo.splice(newTodo.indexOf(task), 1)
    this.setState({ todo: newTodo })
  }

  openEdition = (id) => {
    let newTodo = [...this.state.todo]
    let task = newTodo.find((e) => e.id === id)
    this.setState({ editField: task.text, isModalOpen: true, currentTask: id })
  }

  enterHandler = (e) => {
    if (e.key === 'Enter' && this.state[e.target.name].length > 2) this.saveTask(e.target.name)
  }

  enterEditHandler = (e) => {
    if (e.key === 'Enter' && this.state.editField) {
      this.saveEdit()
    }
  }

  fieldHandler = (e) => this.setState({ [e.target.name]: e.target.value })

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  saveEdit = () => {
    let newTodo = [...this.state.todo]
    let task = newTodo.find((e) => e.id === this.state.currentTask)
    task.text = this.state.editField
    this.setState({ todo: newTodo, isModalOpen: false })
  }

  saveTask = (field) => {
    let value = this.state[field];
    let newTodo = [...this.state.todo, { id: IdGen(`${field}`), text: value, status: 'pending' }]
    this.setState({ [field]: '', todo: newTodo });
  }

  render() {
    let { task, isModalOpen, editField, todo } = this.state
    const complete = [...todo.filter((e) => e.status === 'complete')]
    const pending = [...todo.filter((e) => e.status === 'pending')]
    return (
      <Container>
        <CssBaseline />
        <h1>To-Do List</h1>
        <TextField
          label={'task'}
          name={'task'}
          variant={'outlined'}
          value={task}
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
          editTask={this.openEdition}
        />
        <TaskList
          title={'Completadas'}
          tag={'( X )'}
          data={complete}
          changeStatus={this.changeStatus}
          deleteTask={this.deleteTask}
          editTask={this.openEdition}
        />

        <Dialog open={isModalOpen} onClose={this.toggleModal}>
          <DialogTitle>
            Editar
            </DialogTitle>
          <DialogContent>
            <TextField
              label={'task'}
              name={'editField'}
              variant={'outlined'}
              value={editField}
              onChange={(e) => this.fieldHandler(e)}
              onKeyPress={(e) => this.enterEditHandler(e)}
            >
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.saveEdit()}
            >
              Guardar
              </Button>
            <Button
              onClick={() => this.toggleModal()}
            >
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>

      </Container>
    )
  }
}

export default App;
