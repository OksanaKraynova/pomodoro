import { Tab, Tabs, useTheme, } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import { validateText } from '../../../shared/utils/valitatorUtils';
import { sortDict, sortDictAndRemove } from '../../../shared/utils/taskHelpers';
import SwipeableViews from 'react-swipeable-views';
import { a11yProps } from '../../customMUI/customTabs';
import styles from './todoList.module.css'
import { infoList } from '../../staticData/infoList'
import Form from './Form/Form';
import Working from './Tasks/Working';
import Done from './Tasks/Done';

export function TodoList({ todos, setTodos, setCurrentTask }) {
  const theme = useTheme();
  const [settings, setSettings] = useState(reactLocalStorage.getObject('settings'));
  const [tabsKey, setTabsKey] = useState(0);
  const [newTask, setNewTask] = useState({});
  const [formTouched, setFormTouched] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [tasksInWork, setTaskInWork] = useState([]);
  const [tasksCompleted, setTaskCompleted] = useState([]);

  const handleChangeInput = (e, key, validation, min = 5, max = 50) => {
    setNewTask({ ...newTask, [key]: e.target.value });
    setFormErrors({ ...formErrors, [key]: validation(e.target.value, min, max) });
  };
  function handleTouched(e, key) {
    e.preventDefault();
    setFormTouched({ ...formTouched, [key]: true });
  };
 
  function setTaskUp(id) {
    if (todos[id].order !== 1) {
      const sortedTasks = sortDict(reactLocalStorage.getObject('todos'));
      sortedTasks[Object.values(sortedTasks).find(item => item.order === sortedTasks[id].order - 1).id].order += 1;
      sortedTasks[id].order -= 1;
      setTodos(sortedTasks);
      reactLocalStorage.setObject('todos', sortedTasks);
    }
  }
  function setTaskDown(id) {
    if (todos[id].order !== Object.keys(todos).length) {
      const sortedTasks = sortDict(reactLocalStorage.getObject('todos'));
      sortedTasks[Object.values(sortedTasks).find(item => item.order === sortedTasks[id].order + 1).id].order -= 1;
      sortedTasks[id].order += 1;
      setTodos(sortedTasks);
      reactLocalStorage.setObject('todos', sortedTasks);
    }
  }
  function removeTask(id) {
    const sortedTasks = sortDictAndRemove(reactLocalStorage.getObject('todos'), id);
    setTodos(sortedTasks);
    reactLocalStorage.setObject('todos', sortedTasks);
  }

  useEffect(() => {
    if (Object.keys(todos)?.length) {
      const workList = Object.values(todos).filter(item => item.done === false).sort((a, b) => a.order - b.order);
      setCurrentTask(workList[0]);
      setTaskInWork(workList);
      setTaskCompleted(Object.values(todos).filter(item => item.done === true).sort((a, b) => a.order - b.order))
    } else {
      setCurrentTask({});
      setTaskInWork([]);
      setTaskCompleted([]);
    }
  }, [todos])

  return (
    <div className={styles.wrapper}>
      <div className={styles.description}>
        <h4>Ура! Теперь можно начать работать:</h4>
        <ul>
          {infoList.map(li => <li key={li.title}>{li.title}</li>)}
        </ul>
      </div >
      <Form setTodos={setTodos} handleChangeInput={handleChangeInput} newTask={newTask} handleTouched={handleTouched} formErrors={formErrors} formTouched={formTouched} validateText={validateText} setNewTask={setNewTask} setFormTouched={setFormTouched} setFormErrors={setFormErrors} />
      <div>
        <Tabs value={tabsKey} onChange={(ev, value) => setTabsKey(value)} indicatorColor='secondary' textColor='inherit' variant='fullWidth' >
          <Tab label='В работе' {...a11yProps(0)} />
          <Tab label='Выполнены' {...a11yProps(1)} />
        </Tabs>
        <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={tabsKey} onChangeIndex={index => setTabsKey(index)}>
          <Working setTaskUp={setTaskUp} setTaskDown={setTaskDown} removeTask={removeTask}  settings={settings} tasksInWork={tasksInWork} tabsKey={tabsKey}  setTodos={setTodos} />
          <Done tasksCompleted={tasksCompleted} tabsKey={tabsKey} removeTask={removeTask} />
        </SwipeableViews>
      </div>
    </div>
  );
}