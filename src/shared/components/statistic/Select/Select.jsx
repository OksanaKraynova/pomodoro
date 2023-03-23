import React from 'react';
import { MenuSelectProps, ToDoSelect, ToDoSelectInput } from '../../../customMUI/customSelect';
import { Grid, MenuItem } from '@material-ui/core';
import { useStatisticsPageStyles } from '../../../../pages/statisticsPage/statisticsPageStyles'
import { ToDoFormControl } from '../../../customMUI/customInput';

const Select = ({ currentWeekNumber, weeks }) => {
    const classes = useStatisticsPageStyles();
    return (
        <Grid item xs={12} sm={6} lg={4} className={classes.toRight}>
            <ToDoFormControl className='m-0'>
                <ToDoSelect
                    input={<ToDoSelectInput disableUnderline={true} />}
                    value={currentWeekNumber}
                    onChange={ev => {
                        setCurrentWeekNumber(ev.target.value);
                        setCurrentWeek(statisticsData[ev.target.value]);
                        setCurrentDay(statisticsData[ev.target.value].sort((a, b) => a.numberOfDay - b.numberOfDay)[0])
                    }}
                    MenuProps={MenuSelectProps} >
                    {weeks.map((item, index) => (
                        <MenuItem className={classes.selectOptions} value={item} key={index}>
                            {`Неделя - ${item}`}
                        </MenuItem>
                    ))}
                </ToDoSelect>
            </ToDoFormControl>
        </Grid>
    );
};

export default Select;