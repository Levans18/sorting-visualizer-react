import React from 'react';
import { SortingArea } from './features/SortingArea/SortingArea';
import { Header } from './features/header/Header';
import { Footer } from './features/footer/Footer'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <SortingArea />
      <Footer />
    </div>
  );
}

export default App;
