import { Button } from '@material-ui/core';
import React from 'react';
import makeBtnStyles from '../../customMUI/makeBtnStyles';
import { getActBtnTitle, getActionBtnStyle } from './pomodoroTimerStyles';

const ButtonP = ({view, setView, currentTask}) => {
    const btnClasses = makeBtnStyles();
    function handleClickActBtn(view) {
        switch (view) {
          case 'stopAct':
          case 'initial':
            setView('act');
            break;
          case 'act':
            setView('stopAct');
            break;
          case 'pause':
            setView('stopPause');
            break;
          case 'stopPause':
            setView('pause');
            break;
          default:
            return null;
        }
      }
    return (
        <Button variant='contained' className={getActionBtnStyle(view, btnClasses)} type='button' style={{ marginRight: 15 }} onClick={e => { e.preventDefault(); handleClickActBtn(view) }} disabled={!Object.keys(currentTask || {}).length} >
          {getActBtnTitle(view)}
        </Button>
    );
};

export default ButtonP;