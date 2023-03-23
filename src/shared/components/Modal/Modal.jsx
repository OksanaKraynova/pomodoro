import React, { useContext, useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { validateText } from '../../../shared/utils/valitatorUtils';
import { AppModalContext } from './AppModalProvider';
import ModalStyles from './modalStyles';
import Success from './Success';
import Delete from './Delete';
import EditForm from './EditForm';

export function Modal() {
  const classes = ModalStyles();
  const { isModalOpen, modalProps, setModalProps, setModalOpen } = useContext(AppModalContext);
  const [currentProps, setCurrentProps] = useState({});

  const handleClose = () => {
    setModalOpen(false);
    setModalProps({});
  };

  useEffect(() => {
    let close;
    if (modalProps.needClose) {
      close = setTimeout(() => {
        handleClose();
      }, 3000);
    }
    return () => { clearInterval(close) };
  }, [modalProps]);

  const [taskTitle, setTaskTitle] = useState('');
  const [fieldTouched, setFieldTouched] = useState(false);
  const [fieldError, setFieldError] = useState('-1');
  const [showError, setShowError] = useState(false);

  const handleChangeField = e => {
    e.preventDefault();
    setShowError(false);
    setTaskTitle(e.target.value);
    setFieldError(`${validateText(e.target.value, 5, 50, true)}`);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (fieldError === '-1') {
      currentProps.editTask(currentProps.id, taskTitle);
      handleClose();
    } else {
      setShowError(true);
    }
  };

  useEffect(() => {
    if (Object.keys(modalProps).length) {
      setCurrentProps(modalProps);
    }
  }, [modalProps]);
  useEffect(() => {
    if (modalProps.type === 'edit') {
      setTaskTitle(currentProps?.itemTitle);
      setFieldTouched(false);
      setFieldError('-1');
      setShowError(false);
    }
  }, [currentProps])

  function getModalFragment(type) {
    switch (type) {
      case 'success':
      case 'error':
        return (
          <Success handleClose={handleClose} currentProps={currentProps} type={type} />
        )
      case 'delete':
        return (
          <Delete handleClose={handleClose} currentProps={currentProps} />
        )
      case 'edit':
        return (
          <EditForm currentProps={currentProps} handleChangeField={handleChangeField} taskTitle={taskTitle} handleClose={handleClose} handleSubmit={handleSubmit} fieldError={fieldError} fieldTouched={fieldTouched} setFieldTouched={setFieldTouched} showError={showError} />
        )
      default:
        return (
          <span className='simple-error modal-text mb-60'>
            Ошибка! Что-то пошло не так, повторите попытку позднее!
          </span>
        );
    }
  }

  if (!modalProps?.type) {
    return null;
  }
  return (
    <div>
      <Dialog onClose={handleClose} open={isModalOpen} classes={{ paper: classes.root }}>
        {getModalFragment(modalProps.type)}
      </Dialog>
    </div>
  );
}