import { Typography } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { DialogContentText } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import WarningIcon from '@material-ui/icons/Warning';
import React from 'react';
import ModalStyles from './modalStyles';

const Success = ({currentProps,handleClose, type}) => {
    const classes = ModalStyles();
    return (
        <>
        <MuiDialogContent disableTypography className={classes.headerBar}>
          <Typography variant="h2" className={classes.heading}>{currentProps.title}</Typography>
          <IconButton aria-label='закрыть окно' className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </MuiDialogContent>
        <MuiDialogContent className={classes.content}>
          <DialogContentText className={classes.contentText}>{currentProps.description}</DialogContentText>
          <IconButton  aria-label="закрыть окно"  variant="contained"  type="button" onClick={handleClose}
          >
            {type === 'success' && (<CheckCircleOutlineIcon className={classes.okBtn} />)}
            {type === 'error' && (<WarningIcon className={classes.errorBtn} />)}
          </IconButton>
        </MuiDialogContent>
      </>
    );
};

export default Success;