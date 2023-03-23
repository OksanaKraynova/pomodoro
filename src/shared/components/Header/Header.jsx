import './header.scss';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logo-header.svg';
import equalizer from '../../../assets/img/equalizer.svg';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  appMenu: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      boxShadow: ' 0px 10px 63px rgba(0, 0, 0, 0.07)',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0 10px',
    [theme.breakpoints.up('md')]: {
      margin: '0 auto',
    }
  },

}))

export function Header() {
  const classes = useStyles();

  return (
    <AppBar position='fixed' className={classes.appMenu}>
      <Toolbar className={`container ${classes.header}`}>
        <Link className='header__logo' to='/' >
          <img  src={logo} alt='pomodoro box' />
        </Link>

        <Link  to='/statistics' className='header__link'
          style={{ backgroundImage: `url(${equalizer})`, color: '#DC3E22' }}>
          Статистика
        </Link>
      </Toolbar>
    </AppBar>
  );
}
