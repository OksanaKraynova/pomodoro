import { Typography } from '@material-ui/core';
import React from 'react';
import { getNumberCount } from '../../utils/formatUtils';
import { getBarStyle, usePomodoroTimerStyles } from './pomodoroTimerStyles';

const PomoHeader = ({view,currentTask}) => {
    const classes = usePomodoroTimerStyles();
    return (
        <div className={getBarStyle(view, classes)}>
        <Typography variant='h2' color='textPrimary' className={classes.headerBarText}>
          {currentTask?.title || 'Задача'}
        </Typography>
        <Typography className={classes.headerBarText}>
          {!(view === 'pause' || view === 'stopPause')
            ? `Помидор ${getNumberCount(+currentTask?.spentTomatoes)}`
            : `Перерыв ${getNumberCount(+currentTask?.spentPauses)}`}
        </Typography>
      </div>
    );
};

export default PomoHeader;