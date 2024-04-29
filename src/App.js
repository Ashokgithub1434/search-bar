import React from 'react';
import './App.css'
import SearchPlaces from './components/SearchPlaces';

function App() {
  return (
    <>
    <header className="header">
        <h1>Discover Destinations By Ashok</h1>
      </header>
    <div className="App">
      <SearchPlaces />
    </div>
    </>
  );
}

export default App;
