import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import AgregarCharacter from './pages/AgregarCharacter';
import UpdateCharacter from './pages/UpdateCharacter';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agregar" element={<AgregarCharacter />} />
            <Route path="/marvel" element={<Home />} />
            <Route path="/dc" element={<Home />} />
            <Route path="/detalle/:id" element={<UpdateCharacter />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;