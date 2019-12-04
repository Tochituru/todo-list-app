import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'


const TaskList = ({ data, changeStatus }) => {
    return (
        <List>
            {data.map((e, i) => (<ListItem button onClick={() =>changeStatus(e.id)} key={i} ><ListItemText>{e.text}</ListItemText>{e.status === 'pending' ? '( )' : '( X )' }</ListItem>))}
        </List>
    )
}
export default TaskList