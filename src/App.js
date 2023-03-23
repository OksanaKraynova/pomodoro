import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import navItems from './shared/staticData/navItems';
import { Header } from './shared/components/Header/Header';
import { Modal } from './shared/components/Modal/Modal';
import { reactLocalStorage } from 'reactjs-localstorage';
import { INITIAL_SETTINGS } from './shared/utils/constants';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    
  },
}));

function App() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const [settings, setSettings] = useState(reactLocalStorage.getObject('settings'));

  useEffect(() => {
    const isSendMessages = reactLocalStorage.get('isSendMessages');

    if (!Object.keys(settings).length) {
      reactLocalStorage.setObject('settings', INITIAL_SETTINGS);
    }
    if (isSendMessages === undefined) {
      reactLocalStorage.set('isSendMessages', true);
    }
  }, []);

  return (
    <div className="App">
      <div className={classes.root}>
        <Header handleDrawerToggle={handleDrawerToggle} />

        <main className={classes.content}>
                <Switch>
            {
              navItems.map(item => (
                <Route path={item.slug} key={item.id}>
                  {item.page()}
                </Route>
              ))
            }
            <Route path='*'>
              <Redirect to='/main' />
            </Route>
          </Switch>

          <Modal />
        </main>
      </div>
    </div>
  );
}

export default App;
