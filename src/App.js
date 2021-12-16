import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Register from './components/register';
import { Content } from './components/content';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Add } from './components/add';
import { Planner } from './components/planner';
import { Update } from './components/update';
import Login  from './components/login';
import Logout  from './components/logout';
import { LOGIN_TOKEN_NAME, LOGIN_TOKEN_ID } from "./constants";

// localStorage.removeItem(LOGIN_TOKEN_NAME);
// localStorage.removeItem(LOGIN_TOKEN_ID);

const user = localStorage.getItem(LOGIN_TOKEN_NAME);

class App extends Component {
  render() {
    if (user == null) {
      console.log("Rendering app not logged in.")
      return (
        <Router>
          <div className="App">
          <Switch>
          <Route path='/' component={Login} exact/>
          <Route path='/register' component={Register} />
          </Switch>
          </div>
      </Router>

      )
    }
    console.log("Rendering logged in.");
    console.log(user);
    const parts = user.split(" ");
    
    return (
      <Router>
        <div className="App">

          <Navbar bg="info" variant="light" className="pl-1">
            <Navbar.Brand className="ml-1" href="#home">&nbsp; {parts[0]}'s Planner</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Today</Nav.Link>
              <Nav.Link href="/planner">Planner</Nav.Link>
              <Nav.Link href="/add">Add</Nav.Link>
              <Nav.Link className="ml-auto" href="/logout">Logout</Nav.Link>
            </Nav>
          </Navbar>

          <br />
          <div className="container">
          <Switch>
            <Route path='/' component={Content} exact />
            <Route path='/add' component={Add}/>
            <Route path='/logout' component={Logout}/>
            <Route path='/planner' component={Planner}/>
            <Route path='/update/:id'  component={Update}></Route>
          </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
