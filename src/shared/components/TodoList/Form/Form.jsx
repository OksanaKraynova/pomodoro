import { Grid, Button, FormHelperText } from '@material-ui/core';
import React from 'react';
import { ToDoFormControl, ToDoLabel ,ToDoInput} from '../../../customMUI/customInput';
import makeBtnStyles from '../../../customMUI/makeBtnStyles';
import todoListStyles from '../todoListStyles';
import { validateText } from '../../../utils/valitatorUtils';
import { nanoid } from '@reduxjs/toolkit';
import { reactLocalStorage } from 'reactjs-localstorage';

const Form = ({ handleChangeInput,newTask,handleTouched,formErrors,formTouched,validateText,setNewTask, setFormTouched, setFormErrors , setTodos}) => { 
  const onSubmitTask = (e) => {
    e.preventDefault();
    const errors = {
      title: validateText(newTask?.title, 5, 50),
    };
    if (Object.values(errors).reduce((sum, item) => sum + item, 0) < 0) {
      const id = nanoid(10);
      const todosFromState = reactLocalStorage.getObject('todos');
      todosFromState[id] = {
        ...newTask,
        id,
        order: Object.keys(todosFromState).length + 1,
        spentTomatoes: 0,
        spentPauses: 0,
        tomatoCount: 1,
        done: false,
      };
      setTodos(todosFromState);
      reactLocalStorage.setObject('todos', todosFromState);
      setNewTask({});
      setFormTouched({});
    }
    setFormErrors(errors);
    setFormTouched({
      title: true,
    });
  };
    const classes = todoListStyles();
    const btnClasses = makeBtnStyles();
    return (
        <form className={classes.todoForm} onSubmit={onSubmitTask}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={11}>
            <ToDoFormControl>
              <ToDoLabel variant='filled'>Название задачи</ToDoLabel>
              <ToDoInput type='text'  disableUnderline={true} value={newTask.title || ''} onChange={(e) => handleChangeInput(e, 'title', validateText)} onBlur={(e) => handleTouched(e, 'title')}/>
              {
                (formErrors.title !== -1 && formTouched.title) &&
                <FormHelperText className={classes.errorText}>{formErrors.title}</FormHelperText>
              }
            </ToDoFormControl>
          </Grid>
        </Grid>
        <Button variant='contained' className={btnClasses.primaryBtn} type='submit'>
          Добавить
        </Button>
      </form>
    );
};

export default Form;