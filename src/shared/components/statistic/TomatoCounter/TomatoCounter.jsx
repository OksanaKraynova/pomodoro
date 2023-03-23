import React from 'react';
import { Grid,  Typography, } from '@material-ui/core';
import { useStatisticsPageStyles } from '../../../../pages/statisticsPage/statisticsPageStyles';
import { ReactComponent as HappyTomato } from '../../../../assets/img/happy-tomato.svg';
import { ReactComponent as Tomato } from '../../../../assets/img/tomato.svg';
import { declOfNum } from '../../../utils/formatUtils';

const TomatoCounter = ({currentDay}) => {
    const classes = useStatisticsPageStyles();
    return (
        <Grid item xs={5} sm={12} className={classes.tomatoSummary}>
              {
                !currentDay.pomodoroCount
                  ? <HappyTomato className={classes.happyTomatoIcon} />
                  : <>
                    <Typography paragraph className={classes.tomatoCountWrap}>
                      <Tomato className={classes.tomatoCountIcon} />
                      <span className={classes.tomatoCountDesk}>&nbsp;x&nbsp;</span>
                      <span className={classes.tomatoCountDesk}>{currentDay.pomodoroCount}</span>
                    </Typography>

                    <Typography paragraph className={classes.tomatoCountBar}>
                      {currentDay.pomodoroCount + ' ' + declOfNum(
                        currentDay.pomodoroCount, ['помидор', 'помидара', 'помидоров']
                      )}
                    </Typography>
                  </>
              }
            </Grid>
    );
};

export default TomatoCounter;