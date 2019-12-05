import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'


const TaskList = ({ data, changeStatus, tag, title }) => {
    return (
        <List>
            <h2>{title}</h2>
            {data.map((e, i) => (
                <ListItem button onClick={() => changeStatus(e.id)} key={i} >
                    <ListItemText>
                        {`${tag} ${e.text} `}
                    </ListItemText>
                </ListItem>))
            }
        </List>
    )
}
export default TaskList