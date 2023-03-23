import { List, ListItem, ListItemIcon, useTheme } from '@material-ui/core';
import React from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import { TabPanel } from '../../../customMUI/customTabs';
import { TodoItemText } from '../../../customMUI/todoItemText';
import { getAllTime } from '../../../utils/formatUtils';
import todoListStyles from '../todoListStyles';
import { TodoPopover } from '../TodoPopover';

const Working = ({tasksInWork, setTodos, settings, tabsKey,setTaskUp , setTaskDown, removeTask, editTask}) => {
    const classes = todoListStyles();
    const theme = useTheme();

    function editTask(id, value) {
      const editedTaskList = reactLocalStorage.getObject('todos');
      editedTaskList[id].title = value;
      setTodos(editedTaskList);
      reactLocalStorage.setObject('todos', editedTaskList);
    }
    return (
        <TabPanel value={tabsKey} index={0} dir={theme.direction}>
            <List className={classes.todoList}>
              {
                tasksInWork.length
                  ? <>
                    {tasksInWork.map((item, index) => (
                      <ListItem key={item.id}>
                        <ListItemIcon style={{ minWidth: '2rem' }}>
                          <span className={classes.todoListDecoration}>{index + 1}</span>
                        </ListItemIcon>
                        <TodoItemText primary={item.title} />
                        <TodoPopover 
                          item={item}
                          setTaskUp={setTaskUp}
                          setTaskDown={setTaskDown}
                          removeTask={removeTask}
                          editTask={editTask}
                        />
                      </ListItem>
                    ))}
                    <ListItem>
                      <TodoItemText secondary={` ${getAllTime(tasksInWork, settings.durationOfPomodoro)}`} />
                    </ListItem>
                  </>
                  : <ListItem>
                    <TodoItemText primary='У вас нет задач!' />
                  </ListItem>
              }
            </List>
          </TabPanel>
    );
};

export default Working;