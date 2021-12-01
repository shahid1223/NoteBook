import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Nav from './components/nav'
import Home from './components/home'
import About from './components/about'
import NoteState from './context/notes/noteState'
import Alert from './components/Alert'
import Login from './components/Login'
import Signup from './components/Signup';

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Nav />
        <Alert message="This is amaezing application"/>
        <div className="container">
        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
        </Switch>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
