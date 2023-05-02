import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import { AuthProvider } from './components/Auth'
import NavInshorts from'./components/NavInshorts'
import './App.css';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={LogIn} />
          {/* <Route exact path="/dashboard" component={Dashboard} /> */}
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/NavInshorts" component={NavInshorts} />
          <Route exact path="/Home" component={Home} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
