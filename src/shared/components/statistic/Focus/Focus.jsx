import React from 'react';
import { Grid, Typography, useTheme } from '@material-ui/core';
import FlareRoundedIcon from '@material-ui/icons/FlareRounded';
import { useStatisticsPageStyles } from '../../../../pages/statisticsPage/statisticsPageStyles';

const Focus = ({currentDay}) => {
    const theme = useTheme();
    const classes = useStatisticsPageStyles();
    return (
        <Grid item xs={12} sm={4}>
        <Grid container className={classes.infoBlock}
          style={{
            backgroundColor: !currentDay.finishedTomatoesTime
              ? theme.palette.statistics.emptyLight
              : theme.palette.statistics.focusLight }} >
          <Grid item xs={7} className={classes.blockDesk}>
            <Typography variant='h2' className={classes.blockHeading}>Фокус</Typography>
            <Typography paragraph className={classes.blockValue} >
              {`${Math.floor(
                currentDay.timerUsageTime > 0
                  ? currentDay.finishedTomatoesTime / currentDay.timerUsageTime * 100
                  : 0)}%`}
            </Typography>
          </Grid>
          <Grid item xs={5} className={classes.blockIconWrap}>
            <FlareRoundedIcon className={classes.focusIcon}
              style={{
                color: !currentDay.finishedTomatoesTime
                  ? theme.palette.statistics.emptyDark
                  : theme.palette.statistics.focusDark,
              }}/>
          </Grid>
        </Grid>
      </Grid>
    );
};

export default Focus;