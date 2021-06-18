import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GetAllMovies from "./components/GetAllMovies";
import GetSpecMovie from "./components/GetSpecMovie";
import AddMovie from "./components/addMovie";
import AddPerson from "./components/addCharacter";

function App() {

  return (
      <Router>
          <div className="App">
              <Switch>
                  <Route exact path="/" component={GetAllMovies}/>
                  <Route exact path="/addMovie" component={AddMovie}/>
                  <Route exact path="/addCharacter" component={AddPerson}/>
                  <Route exact path="/movies/:id" component={GetSpecMovie}/>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
