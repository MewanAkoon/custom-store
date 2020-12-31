import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getLoggedInUserDetails } from './store/login';
import { useSelector } from 'react-redux';

import Home from './components/home';
import NotFound from './components/notFound';
import Navbar from './components/navbar';

const App = () => {
  // getting the looged in user
  const user = useSelector(getLoggedInUserDetails);

  return (
    <React.Fragment>
      <div className='navbar navbar-expand-sm navbar-dark bg-primary'>
        <div className='container'>
          <Navbar { ...user } />
        </div>
      </div>
      <div>
        <Switch>
          <Route path='/not-found' component={ NotFound } />
          <Route
            path='/home'
            render={ props => <Home user={ user } { ...props } /> }
          />
          <Redirect from='/' exact to='/home' />
          <Redirect to='/not-found' />
        </Switch>
      </div>
    </React.Fragment>);
}

export default App;
