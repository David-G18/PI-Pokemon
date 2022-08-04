import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import PokemonCreate from './components/PokemonCreate/PokemonCreate';
import './App.css';

function App() {
  return (
    <div className = "App">
      <Switch>
        <Route exact path = '/'>
          <LandingPage />
        </Route>
        <Route exact path = '/pokemons'>
          <NavBar />
          <Home />
        </Route>
        <Route path = '/pokemons/create'>
          <NavBar />
          <PokemonCreate />
        </Route>
        <Route path = '/pokemons/:id'>
          <NavBar />
          <PokemonDetail />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
