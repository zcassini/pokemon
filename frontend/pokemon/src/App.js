import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import RandomPokemon from './RandomPokemon';
import Collection from './Collection';
import ServerPokemon from './ServerPokemon';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/collection">Collection</Link>
          <Link to="/server-pokemon">Server Pokemon</Link>
        </nav>
        <Routes>
          <Route exact path="/" element={<RandomPokemon />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/server-pokemon" element={<ServerPokemon />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
