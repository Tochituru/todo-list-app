import React from 'react'
import { List, ListItem, ListItemText, Button } from '@material-ui/core'


const TaskList = ({ data, changeStatus, deleteTask, tag, title }) => {
    return (
        <List>
            <h2>{title}</h2>
            {data.map((e, i) => (
                <ListItem button key={i} >
                    <ListItemText onClick={() => changeStatus(e.id)}>
                        {`${tag} ${e.text} `}
                    </ListItemText>
                    <Button variant={'contained'} onClick={() => deleteTask(e.id)}>
                        Eliminar
                    </Button>
                </ListItem>))
            }
        </List>
    )
}
export default TaskList