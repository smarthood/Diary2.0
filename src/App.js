import "./styles/App.css";
import Left from "./Left";
import Right from "./Right";
import {BrowserRouter as Router,Routes,Route, Switch} from 'react-router-dom'


function App() {
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Left/>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;