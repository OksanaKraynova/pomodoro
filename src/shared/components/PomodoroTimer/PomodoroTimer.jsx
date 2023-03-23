import React, { useContext, useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { reactLocalStorage } from 'reactjs-localstorage';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { getTimerFaceStyle, usePomodoroTimerStyles, } from './pomodoroTimerStyles';
import { getFormatTime } from '../../../shared/utils/timerHelpers';
import { getISODay, getISOWeek } from 'date-fns';
import { AppModalContext } from '../Modal/AppModalProvider';
import modalVariants from '../Modal/modalVariants';
import { INITIAL_SETTINGS, INITIAL_WEEKLY_STATISTICS } from '../../../shared/utils/constants';
import ButtonS from './ButtonS';
import ButtonP from './ButtonP';
import ChooseTask from './ChooseTask';
import PomoHeader from './PomoHeader';

export function PomodoroTimer({ currentTask, setTodos, setCurrentTask }) {
  const classes = usePomodoroTimerStyles();
  const [settings, setSettings] = useState(reactLocalStorage.getObject('settings'));
  const { isModalOpen,  setModalProps, setModalOpen } = useContext(AppModalContext);
  const [view, setView] = useState('initial');
  const [currentTime, setCurrentTime] = useState((settings?.durationOfPomodoro || INITIAL_SETTINGS.durationOfPomodoro) * 60 * 1000);
  const [timerUsageTime, setTimerUsageTime] = useState(0);
  const [pauseTime, setPauseTime] = useState(0);
  const [stopCount, setStopCount] = useState(0);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [finishedTomatoesTime, setFinishedTomatoesTime] = useState(0);
  const [timeForFinishedTomatoes, setTimeForFinishedTomatoes] = useState(0);

  useEffect(() => {
    const currentWeek = (getISOWeek(new Date()) + 1).toString();
    const numberOfDay = getISODay(new Date()).toString();
    const statisticsData = reactLocalStorage.getObject('statistics') || {};
    if (!statisticsData[currentWeek]) {
      statisticsData[currentWeek] = INITIAL_WEEKLY_STATISTICS;
    } else if (Object.keys(statisticsData).includes(currentWeek)) {
      const key = statisticsData[currentWeek].findIndex(item => item.numberOfDay === numberOfDay);
      statisticsData[currentWeek][key]['timerUsageTime'] += Math.ceil(timerUsageTime / 60000);
      statisticsData[currentWeek][key]['finishedTomatoesTime'] += Math.ceil(finishedTomatoesTime / 60000);
      statisticsData[currentWeek][key]['pauseTime'] += Math.ceil(pauseTime / 60000);
      statisticsData[currentWeek][key]['stopCount'] += stopCount;
      statisticsData[currentWeek][key]['pomodoroCount'] += pomodoroCount;
      statisticsData[currentWeek][key]['numberOfDay'] = numberOfDay;
    }
    reactLocalStorage.setObject('statistics', statisticsData);
    setTimerUsageTime(0);
    setFinishedTomatoesTime(0);
    setPauseTime(0);
    setStopCount(0);
    setPomodoroCount(0);
  }, [view]);

  useEffect(() => {
    const isShowMessages = reactLocalStorage.get('isSendMessages') === 'true';
    const watch = setInterval(() => {
      switch (view) {
        case 'act':
        case 'hover':
          setCurrentTime(currentTime - 1000);
          setTimerUsageTime(timerUsageTime + 1000);
          setTimeForFinishedTomatoes(timeForFinishedTomatoes + 1000);
          if (currentTime <= 0) {
            const tasks = reactLocalStorage.getObject('todos');
            setPomodoroCount(pomodoroCount + 1);
            tasks[currentTask.id].spentTomatoes += 1;
            setTodos(tasks);
            setCurrentTask(tasks[currentTask.id])
            reactLocalStorage.setObject('todos', tasks);
            setCurrentTime(
              !!tasks[currentTask.id].spentTomatoes && !(tasks[currentTask.id].spentTomatoes % +settings.frequencyOfLongPauses) ? +settings.durationOfLongPause * 60 * 1000 : +settings.durationOfShotPause * 60 * 1000);
            setFinishedTomatoesTime(timeForFinishedTomatoes);
            setTimeForFinishedTomatoes(0);
            setView('pause');
            if (isShowMessages) {
              setModalOpen(!isModalOpen);
              setModalProps(modalVariants.successByAct);
            }}
          break;
        case 'pause':
          setCurrentTime(currentTime - 1000);
          setTimerUsageTime(timerUsageTime + 1000);
          if (currentTime <= 0) {
            const tasks = reactLocalStorage.getObject('todos');
            tasks[currentTask.id].spentPauses += 1;
            setTodos(tasks);
            setCurrentTask(tasks[currentTask.id])
            reactLocalStorage.setObject('todos', tasks);
            setCurrentTime(+settings.durationOfPomodoro * 60 * 1000);
            setView('initial');
            if (isShowMessages) {
              setModalOpen(!isModalOpen);
              setModalProps(modalVariants.successByPause);
            }}
          break;
        case 'stopAct':
        case 'stopPause':
          setTimerUsageTime(timerUsageTime + 1000);
          setPauseTime(pauseTime + 1000);
          break;
        default:
          return null
      }}, 1000);
    return () => { clearInterval(watch)};
  }, [view, currentTime, timerUsageTime, pomodoroCount, pauseTime, timeForFinishedTomatoes]);

  return (
    <Card className={classes.root}>
      <PomoHeader view={view} currentTask={currentTask} />
      <div className={classes.timerWrap}>
        <span className={getTimerFaceStyle(view, classes)}>{getFormatTime(currentTime)}</span>
        <IconButton aria-label='увеличить интервал' className={classes.addBtn} disabled={!(view === 'pause' || view === 'initial')} type='button' onClick={e => { setCurrentTime(currentTime + 3 * 60 * 1000) }}>
          <AddCircleIcon className={classes.addBtnIcon} />
        </IconButton>
      </div>
      <ChooseTask currentTask={currentTask} />
      <CardActions className={classes.actionsBar} >
        <ButtonP view={view} setView={setView} currentTask={currentTask} />
        <ButtonS view={view} setCurrentTime={setCurrentTime} setStopCount={setStopCount} setTimeForFinishedTomatoes={setTimeForFinishedTomatoes} setView={setView} setPomodoroCount={setPomodoroCount} setTodos={setTodos} setCurrentTask={setCurrentTask} setFinishedTomatoesTime={setFinishedTomatoesTime} timeForFinishedTomatoes={timeForFinishedTomatoes} setModalOpen={setModalOpen} isModalOpen={isModalOpen} settings={settings} currentTask={currentTask} stopCount={stopCount} setModalProps={setModalProps} pomodoroCount={pomodoroCount} modalVariants={modalVariants} />
      </CardActions>
    </Card>
  );
}