import "./styles/App.css";
import Left from "./components/Left";
import Main from "./components/Main";
import Right from "./components/Right";
import {BrowserRouter as Router,Routes,Route, Switch} from 'react-router-dom';
import AddNotes from "./components/AddNotes";

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Main/>
        </Route>
        <Route path="/add_new">
          <AddNotes/>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;