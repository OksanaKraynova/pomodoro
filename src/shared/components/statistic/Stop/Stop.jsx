import React from 'react';
import { Grid, Typography, useTheme, } from '@material-ui/core';
import BlockRoundedIcon from '@material-ui/icons/BlockRounded';
import { useStatisticsPageStyles } from '../../../../pages/statisticsPage/statisticsPageStyles';

const Stop = ({currentDay}) => {
    const theme = useTheme();
    const classes = useStatisticsPageStyles();
    return (
        <Grid item xs={12} sm={4}>
            <Grid container className={classes.infoBlock}
                style={{
                    backgroundColor: !currentDay.stopCount
                        ? theme.palette.statistics.emptyLight
                        : theme.palette.statistics.stopLight,
                }} >
                <Grid item xs={7} className={classes.blockDesk}>
                    <Typography variant='h2' className={classes.blockHeading}>Остановки</Typography>
                    <Typography paragraph className={classes.blockValue}>
                        {currentDay.stopCount}
                    </Typography>
                </Grid>
                <Grid item xs={5} className={classes.blockIconWrap}>
                    <BlockRoundedIcon className={classes.focusIcon}
                        style={{
                            color: !currentDay.stopCount
                                ? theme.palette.statistics.emptyDark
                                : theme.palette.statistics.stopDark
                        }}                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Stop;