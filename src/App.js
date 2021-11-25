import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
//import Register from './components/storage';


//import Register from './components/storage';
import Login from './components/Login/Login';
import Registration from './components/Registration-form/Registration';
import UserDetails from './components/User-details/UserDetails';
import Update from './components/Update/Update';
import Signup from './components/Signup/Signup';
//import Navbar from './components/Navbar/Navbar';
//import Update from './components/Update/Update';
//import { useState } from 'react/cjs/react.development';
//import userDetails from './components/User-details/UserDetails';

function App() {
   
  //let check = localStorage.getItem("isSubmitted");
   
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/signUp' component={Signup}/>
        <ProtectedRoute exact path='/registration'  component={Registration}/>
        <ProtectedRoute exact path='/userDetails' component={UserDetails} />
        <ProtectedRoute exact path='/update' component={Update}/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
