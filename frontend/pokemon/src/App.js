import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import RandomPokemon from './RandomPokemon';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <Routes>
          <Route path="/" element={<RandomPokemon />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
