import { Button } from '@material-ui/core';
import React from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import makeBtnStyles from '../../customMUI/makeBtnStyles';
import { getHelperBtnStyle, getHelperBtnTitle } from './pomodoroTimerStyles';

const ButtonS = ({ currentTask, view, setCurrentTime, setStopCount, setTimeForFinishedTomatoes, setView, setPomodoroCount, setTodos, setCurrentTask, setFinishedTomatoesTime, timeForFinishedTomatoes, setModalOpen, isModalOpen, settings,stopCount , setModalProps, pomodoroCount,modalVariants}) => {
    const btnClasses = makeBtnStyles();
    function handleClickHelperBtn(view) {
        switch (view) {
            case 'act':
            case 'hover':
                setCurrentTime(+settings.durationOfPomodoro * 60 * 1000);
                setStopCount(stopCount + 1);
                setTimeForFinishedTomatoes(0);
                setView('initial');
                break;
            case 'stopAct':
                const isShowMessages = reactLocalStorage.get('isSendMessages') === 'true';
                const tasks = reactLocalStorage.getObject('todos');
                setPomodoroCount(pomodoroCount + 1);
                tasks[currentTask.id].spentTomatoes += 1;
                tasks[currentTask.id].done = true;
                tasks[currentTask.id].order = -10;
                setTodos(tasks);
                setCurrentTask(tasks[currentTask.id]);
                reactLocalStorage.setObject('todos', tasks);
                setFinishedTomatoesTime(timeForFinishedTomatoes);
                setTimeForFinishedTomatoes(0);
                setCurrentTime(+settings.durationOfPomodoro * 60 * 1000);
                setView('initial');
                if (isShowMessages) {
                    console.log(isShowMessages);
                    setModalOpen(!isModalOpen);
                    setModalProps(modalVariants.successByDone);
                }
                break;
            case 'pause':
                setCurrentTime(+settings.durationOfPomodoro * 60 * 1000);
                setStopCount(stopCount + 1);
                setTimeForFinishedTomatoes(0);
                setView('initial');
                break;
            case 'stopPause':
                setCurrentTime(+settings.durationOfPomodoro * 60 * 1000);
                setTimeForFinishedTomatoes(0);
                setView('initial');
                break;
            default:
                return null;
        }
    }

  function onMouseMotion(view) {
    switch (view) {
      case 'act':
        setView('hover');
        break;
      case 'hover':
        setView('act');
        break;
      default:
        return null;
    }
  }
    return (
        <Button variant='contained' className={getHelperBtnStyle(view, btnClasses)} type='button' disabled={view === 'initial'} onClick={e => { e.preventDefault(); handleClickHelperBtn(view) }} onMouseOver={() => onMouseMotion(view)} onMouseOut={() => onMouseMotion(view)} >
            {getHelperBtnTitle(view)}
        </Button>
    );
};

export default ButtonS;