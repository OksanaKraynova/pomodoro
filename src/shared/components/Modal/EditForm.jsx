import React from 'react';
import { Button, FormHelperText, Typography } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ModalStyles from './modalStyles';
import makeBtnStyles from '../../customMUI/makeBtnStyles';
import { ToDoFormControl, ToDoLabel, ToDoInput } from '../../customMUI/customInput';

const EditForm = ({ currentProps,handleChangeField , taskTitle, handleClose ,handleSubmit, fieldError, fieldTouched,setFieldTouched, showError}) => {
    const btnClasses = makeBtnStyles();
    const classes = ModalStyles();
    return (
        <>
            <MuiDialogTitle disableTypography className={classes.headerBar}>
                <IconButton aria-label='закрыть окно' className={classes.closeButton} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </MuiDialogTitle>

            <MuiDialogContent className={classes.form}>
                <Typography variant="h2" className={classes.heading} classes={{ root: classes.deleteHeading }}>
                    {currentProps.title}
                </Typography>

                <form onSubmit={handleSubmit} className={classes.form}>
                    <ToDoFormControl>
                        <ToDoLabel variant='filled'>{currentProps.description}</ToDoLabel>
                        <ToDoInput type='text' disableUnderline={true} value={taskTitle} onChange={handleChangeField} onBlur={() => setFieldTouched(true)} />
                        {fieldError !== '-1' && fieldTouched &&
                            <FormHelperText className={classes.errorText}>{fieldError}</FormHelperText>
                        }
                    </ToDoFormControl>
                    {showError && <Typography paragraph className={classes.errorMessage}>
                        Поле должно быть заполнено корректно!
                    </Typography>
                    }
                    <Button variant='contained' className={btnClasses.primaryBtn} classes={{ root: classes.deleteBtn }} type='submit'>
                        Сохранить
                    </Button>
                </form>
                <Button onClick={handleClose} color="secondary" className={btnClasses.underlinedBtn}>
                    Отмена
                </Button>
            </MuiDialogContent>
        </>
    );
};

export default EditForm;