import {HashRouter,Routes,Route} from 'react-router-dom';
import DefaultComponent from './components/DefaultComponent';
import Pokedex from './components/Pokedex';
import './App.css';
import ProtectedRoutes from './components/ProtectedRoutes';
import PokemonId from './components/PokemonId';
import PokeTypes from './components/PokeTypes';
import PokeSearch from './components/PokeSearch';

function App() {
  return (
     <div className="App">
      <HashRouter>
        
        <Routes>
          <Route path="/" element={<DefaultComponent/>} />
          <Route element={<ProtectedRoutes/>}>
            <Route path="/pokedex" element={<Pokedex/>} />
            <Route path="/pokedex/:id" element={<PokemonId/>} />
            <Route path="/types" element={<PokeTypes/>} />
            <Route path="/pokeSearch" element={<PokeSearch/>} />

          </Route>
          
        </Routes>
      </HashRouter>
    
    </div>
  );
}

export default App;
