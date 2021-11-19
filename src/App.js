import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

// import { renderRoutes } from 'react-router-config';
import './App.scss';
import ProtectedRoute from "./ProtectedRoute";

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
// const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const Subscription = React.lazy(() => import('./views/Subscription/Subscription.js'));
const CountySubscription = React.lazy(() => import('./views/Subscription/CountySubscription.js'));
const AddCard = React.lazy(() => import('./views/Subscription/AddCard.js'));
const ResetPassword = React.lazy(() => import('./views/Pages/Login/ResetPassword.js'));

class App extends Component {

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <ProtectedRoute path="/county-subscription" name="County Subscription" component={CountySubscription} />
            <Route exact path="/subscribe" name="Subscription" render={props => <Subscription {...props} />} />
            <Route exact path="/" name="Login Page" render={props => <Login {...props} />} />
            {/* <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} /> */}
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
            <Route path="/details" name="Add Card" component={AddCard} />
            <Route path="/resetpassword/:id" name="Reset Password" render={props => <ResetPassword {...props} />} />
            <ProtectedRoute path="/home" name="Home" component={DefaultLayout} />
            {/* <Route exact path="/addMailchimpId" name="addMailchimpId" render={props => <AddMailChimpPage {...props} />} /> */}
            <Route component={Page404}></Route>
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
