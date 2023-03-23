import { useTheme } from '@material-ui/core';
import React from 'react';
import { Background, VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory';
import { axisXStyle, axisYStyle } from '../../../../pages/statisticsPage/statisticsPageStyles';
import { getTimeLabelForAxe } from '../../../utils/formatUtils';

const Chart = ({ currentWeek, currentDay, setCurrentDay }) => {
    const theme = useTheme();
    return (
        <VictoryChart domainPadding={{ x: [17, 17], y: 10 }} theme={VictoryTheme.material} height={200} padding={{ top: 0, bottom: 25, left: 5, right: 45 }} style={{ background: { fill: theme.palette.graph.footerBar } }} backgroundComponent={<Background y={175} height={60} x={-2} width={400} />}>
            <VictoryAxis
                tickValues={[1, 2, 3, 4, 5, 6, 7]}
                tickFormat={['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']}
                style={axisXStyle(currentWeek, theme, currentDay)}
            />
            <VictoryAxis dependentAxis tickFormat={x => getTimeLabelForAxe(x)} offsetX={360} padding={{ top: 10, bottom: 10, left: 10, right: -10 }} style={axisYStyle(theme)} animate={{ easing: 'linear', duration: 500, onLoad: { duration: 500 } }} />

            <VictoryBar data={currentWeek} x='numberOfDay' y='timerUsageTime' style={{ data: { fill: ({ datum }) => datum.numberOfDay === currentDay.numberOfDay ? theme.palette.graph.barHover : theme.palette.graph.bar } }} animate={{ easing: 'linear', duration: 500, onLoad: { duration: 500 } }} barWidth={35} events={[{
                target: 'data',
                eventHandlers: {
                    onClick: (target) => {
                        return [{
                            mutation: props => {
                                setCurrentDay(props.datum);
                                return {
                                    style: {
                                        fill: theme.palette.graph.barHover,
                                        cursor: 'pointer',
                                    }
                                };
                            }
                        }];
                    },
                    onMouseOver: () => {
                        return [{
                            mutation: () => {
                                return {
                                    style: {
                                        fill: theme.palette.graph.barHover,
                                        cursor: 'pointer',
                                    }
                                };
                            }
                        }];
                    },
                    onMouseLeave: () => {
                        return [{
                            mutation: () => {
                                return {
                                    fill: ({ datum }) => datum.numberOfDay !== currentDay.numberOfDay  ? theme.palette.graph.barHover : theme.palette.graph.bar,
                                };
                            }
                        }];
                    },
                }
            }]}
            />
        </VictoryChart>
    );
};

export default Chart;