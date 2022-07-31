import "./styles/App.css";
import Main from "./components/Main";
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import AddNotes from "./components/AddNotes";
import Home from "./components/Star";

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route  path="/diary">
          <Main/>
        </Route>
        <Route path="/add">
          <AddNotes/>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;