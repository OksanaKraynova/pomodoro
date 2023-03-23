import React from 'react';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ModalStyles from './modalStyles';
import makeBtnStyles from '../../customMUI/makeBtnStyles';

const Delete = ({handleClose, currentProps}) => {
    
 const btnClasses = makeBtnStyles();
    const classes = ModalStyles();
    return (
        <>
            <MuiDialogContent disableTypography className={classes.headerBar}>
                <IconButton aria-label='закрыть окно' className={classes.closeButton} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </MuiDialogContent>
            <MuiDialogContent className={classes.content}>
                <Typography variant="h2" className={classes.heading} classes={{ root: classes.deleteHeading }}>
                    {currentProps.title}
                </Typography>
                <Button variant='contained' className={btnClasses.secondaryBtn} lasses={{ root: classes.deleteBtn }} type='button' onClick={() => { currentProps.removeTask(currentProps.id); handleClose(); }}>
                    Удалить
                </Button>

                <Button onClick={handleClose} color="secondary" className={btnClasses.underlinedBtn}>
                    Отмена
                </Button>
            </MuiDialogContent>
        </>
    );
};

export default Delete;