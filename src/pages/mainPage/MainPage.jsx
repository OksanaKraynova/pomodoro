import {  Grid } from '@material-ui/core';
import withTitleUpdate from '../../shared/hocs/withTitleUpdate';
import { TodoList } from '../../shared/components/TodoList/TodoList';
import { reactLocalStorage } from 'reactjs-localstorage';
import { useState } from 'react';
import { PomodoroTimer } from '../../shared/components/PomodoroTimer/PomodoroTimer';

function MainPage() {
  const [todos, setTodos] = useState(reactLocalStorage.getObject('todos') || {});
  const [currentTask, setCurrentTask] = useState({});

  return (
    <section className='container flex-column main-container'>
        <Grid >
          <TodoList todos={todos} setTodos={setTodos} setCurrentTask={setCurrentTask} />
        </Grid>

        <Grid >
          <PomodoroTimer currentTask={currentTask} setTodos={setTodos} setCurrentTask={setCurrentTask} />
        </Grid>
    </section>
  );
}

export default withTitleUpdate(MainPage, 'Главная');
