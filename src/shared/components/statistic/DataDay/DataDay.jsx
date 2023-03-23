import React from 'react';
import { Grid, Typography, } from '@material-ui/core';
import { DAYS_LIST } from '../../../utils/constants';
import { useStatisticsPageStyles } from '../../../../pages/statisticsPage/statisticsPageStyles';
import { getHumanTimeInterval } from '../../../utils/formatUtils';

const DataDay = ({ currentDay }) => {
    const classes = useStatisticsPageStyles();
    return (
        <Grid item xs={6} sm={12} className={classes.summary}>
            <Typography variant='h2' className={classes.blockHeading}>
                {DAYS_LIST[currentDay.numberOfDay - 1]}:
            </Typography>
            <br />
            <Typography paragraph className={classes.summaryText}>
                {!currentDay.timerUsageTime
                    ? 'Нет данных'
                    : (<>
                        Вы работали над задачами в течение
                        <span className={classes.timeText}> {getHumanTimeInterval(currentDay.timerUsageTime)}</span>
                    </>)}
            </Typography>
        </Grid>
    );
};

export default DataDay;