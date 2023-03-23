import { IconButton, List , ListItem, ListItemIcon,useTheme} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import React from 'react';
import { TabPanel } from '../../../customMUI/customTabs';
import { TodoItemText } from '../../../customMUI/todoItemText';
import todoListStyles from '../todoListStyles';

const Done = ({tasksCompleted,tabsKey,removeTask}) => {
    const classes = todoListStyles();
    const theme = useTheme();
    return (
        <TabPanel value={tabsKey} index={1} dir={theme.direction}>
        <List className={classes.todoList}>
          {
            !!tasksCompleted.length
              ? <>
                {tasksCompleted.map((item, index) => (
                  <ListItem key={item.id}>
                    <ListItemIcon style={{ minWidth: '2rem' }}>
                      <span className={classes.todoListDecorationDone}>
                        <CheckCircleOutlineIcon className={classes.done} />
                      </span>
                    </ListItemIcon>

                    <TodoItemText primary={item.title} />
                    <IconButton onClick={ev => { ev.preventDefault(); removeTask(item.id); }}>
                      <DeleteOutlineOutlinedIcon className={classes.popoverBtn} />
                    </IconButton>
                  </ListItem>
                ))}
              </>
              : <ListItem>
                <TodoItemText primary='У вас нет выполненных задач!' />
              </ListItem>
          }
        </List>
      </TabPanel>
    );
};

export default Done;