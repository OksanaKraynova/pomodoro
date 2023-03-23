import MainPage from '../../pages/mainPage/MainPage';
import StatisticsPage from '../../pages/statisticsPage/StatisticsPage';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import HomeIcon from '@material-ui/icons/Home';

const nalItems = [
  {
    id: '13main',
    name: 'Pomodoro',
    slug: '/main',
    icon: mainIcon,
    page: Main,
  },
  {
    id: '23statistics',
    name: 'Статистика',
    slug: '/statistics',
    icon: statisticsIcon,
    page: Statistics,
  },
]

function mainIcon(color) {
  return (
    <HomeIcon color={color} />
  );
}

function statisticsIcon(color) {
  return (
    <EqualizerIcon color={color} />
  );
}

function Main() {
  return (
    <MainPage />
  );
}

function Statistics() {
  return (
    <StatisticsPage />
  );
}

export default nalItems;
