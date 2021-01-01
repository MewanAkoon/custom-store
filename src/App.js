import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getLoggedInUserDetails } from './store/login';
import { useSelector } from 'react-redux';

import Home from './components/home';
import NotFound from './components/notFound';
import Navbar from './components/navbar';
import Login from './components/login';
import ViewProduct from './components/product/viewProduct';
import EditProduct from './components/product/editProduct';
import AddProduct from './components/product/addProduct';
import Signup from './components/singup';
import EditUser from './components/user/editUser';

const App = () => {
  // getting the looged in user
  const user = useSelector(getLoggedInUserDetails);

  return (
    <React.Fragment>
      <div className='navbar navbar-expand-sm navbar-dark bg-primary'>
        <div className='container'>
          <Navbar user={ user } />
        </div>
      </div>
      <div>
        <Switch>
          <Route
            path='/user/edit'
            render={ props => <EditUser user={ user } { ...props } /> }
          />
          <Route
            path='/product/edit/:id'
            render={ props => <EditProduct user={ user } { ...props } /> }
          />
          <Route
            path='/product/add/'
            render={ props => <AddProduct user={ user } { ...props } /> }
          />
          <Route
            path='/product/:id'
            render={ props => <ViewProduct user={ user } { ...props } /> }
          />
          <Route path='/not-found' component={ NotFound } />
          <Route
            path='/login'
            render={ props => <Login user={ user } { ...props } /> }
          />
          <Route
            path='/signup'
            render={ props => <Signup { ...props } /> }
          />
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
