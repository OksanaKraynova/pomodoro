import React from 'react';
import { Grid, Typography, } from '@material-ui/core';
import { useStatisticsPageStyles } from '../../../../pages/statisticsPage/statisticsPageStyles';

const Title = () => {
    const classes= useStatisticsPageStyles()
    return (
        <Grid item xs={12} sm={6}>
            <Typography variant='h2' color='textPrimary' className={classes.subheading}>
                Ваша активность:
            </Typography>
        </Grid>
    );
};

export default Title;