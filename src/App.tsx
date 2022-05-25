import React from 'react';
import { Sorting } from './features/sorting/Sorting';
import { Header } from './features/header/Header';
import { Footer } from './features/footer/Footer'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Sorting />
      <Footer />
    </div>
  );
}

export default App;
