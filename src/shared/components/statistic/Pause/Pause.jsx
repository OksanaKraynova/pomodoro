import React from 'react';
import {  Grid,  Typography,  useTheme,} from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { getTimeLabelForPause } from '../../../utils/formatUtils';
import { useStatisticsPageStyles } from '../../../../pages/statisticsPage/statisticsPageStyles';

const Pause = ({currentDay}) => {  
    const theme = useTheme();
    const classes = useStatisticsPageStyles();
    return (
        <Grid item xs={12} sm={4}>
        <Grid  container className={classes.infoBlock}
          style={{
            backgroundColor: !currentDay.pauseTime
              ? theme.palette.statistics.emptyLight
              : theme.palette.statistics.pauseLight,
          }}        >
          <Grid item xs={7} className={classes.blockDesk}>
            <Typography variant='h2' className={classes.blockHeading}>Время на паузе</Typography>
            <Typography paragraph className={classes.blockValue}>
              {getTimeLabelForPause(currentDay.pauseTime)}
            </Typography>
          </Grid>
          <Grid item xs={5} className={classes.blockIconWrap}>
            <ScheduleIcon
              className={classes.focusIcon}
              style={{
                color: !currentDay.pauseTime
                  ? theme.palette.statistics.emptyDark
                  : theme.palette.statistics.pauseDark,
              }}  />
          </Grid>
        </Grid>
      </Grid>
    );
};

export default Pause;