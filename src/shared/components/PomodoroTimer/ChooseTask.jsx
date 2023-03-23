import { CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { usePomodoroTimerStyles } from './pomodoroTimerStyles';

const ChooseTask = ({ currentTask }) => {
    const classes = usePomodoroTimerStyles();
    return (
        <CardContent>
            <Typography variant='body2' color='textPrimary' component='p' className={classes.timerContent}>
                {currentTask?.title
                    ? <><span className={classes.timerContentRemark}>Задача - </span>{currentTask?.title}</>
                    : 'Выберите задачу!'}
            </Typography>
        </CardContent>
    );
};

export default ChooseTask;