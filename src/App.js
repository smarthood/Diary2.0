import "./styles/App.css";
import Main from "./pages/Main";
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import Left from "./components/Left";
import Home from "./pages/Home";

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
          <Left/>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;