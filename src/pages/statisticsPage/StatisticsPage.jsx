import { Grid, Paper } from '@material-ui/core';
import withTitleUpdate from '../../shared/hocs/withTitleUpdate';
import React, { useState } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import { DEFAULT_STATISTICS } from '../../shared/utils/constants';
import { useStatisticsPageStyles } from './statisticsPageStyles';
import Select from '../../shared/components/statistic/Select/Select';
import Chart from '../../shared/components/statistic/Chart/Chart';
import Focus from '../../shared/components/statistic/Focus/Focus';
import Pause from '../../shared/components/statistic/Pause/Pause';
import Stop from '../../shared/components/statistic/Stop/Stop';
import TomatoCounter from '../../shared/components/statistic/TomatoCounter/TomatoCounter';
import DataDay from '../../shared/components/statistic/DataDay/DataDay';
import Title from '../../shared/components/statistic/Title/Title';

function StatisticsPage() {
  const day = new Date()
  const today = day.getDay()
  const classes = useStatisticsPageStyles();
  const statisticsData = reactLocalStorage.getObject('statistics');
  const presentData = Object.keys(statisticsData).length ? statisticsData : DEFAULT_STATISTICS;
  const weeks = Object.keys(presentData).sort((a, b) => Number(b) - Number(a));
  const [currentWeekNumber, setCurrentWeekNumber] = useState(weeks[0]);
  const [currentWeek, setCurrentWeek] = useState(presentData[currentWeekNumber]);
  const [currentDay, setCurrentDay] = useState(currentWeek.sort((a, b) => a.numberOfDay - b.numberOfDay)[today - 1]);

  return (
    <section className='container flex-column'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Title />
            <Select currentWeekNumber={currentWeekNumber} weeks={weeks} />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid container style={{ height: '100%' }} direction='row' justifyContent='space-between'          >
            <DataDay currentDay={currentDay} />
            <TomatoCounter currentDay={currentDay} />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paperGraph}>
            <Chart currentWeek={currentWeek} currentDay={currentDay} setCurrentDay={setCurrentDay} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Focus currentDay={currentDay} />
            <Pause currentDay={currentDay} />
            <Stop currentDay={currentDay} />
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
}

export default withTitleUpdate(StatisticsPage, 'Статистика');