import React from "react";
import '../styles/Navbar.css';
import Marvel_Logo from '../assets/marvel.svg';
import DC_Logo from '../assets/dc.png';

function Navbar() {

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const cards = document.querySelectorAll('.hero-card');
    cards.forEach(card => {
      const characterName = card.querySelector('.title-card').textContent.toLowerCase();
      if (characterName.includes(query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
  return (
      <div className="navbar">
        <div className="logos-container">
          <a href="/marvel"><img className="img-navbar1" src={Marvel_Logo} alt="Marvel" /> </a>
          <h1 className="title-navbar">x</h1>
          <a href="/dc"><img className="img-navbar2" src={DC_Logo} alt="DC" /> </a>
        </div>
          <input className="input-navbar" type="text" onInput={handleSearch} placeholder="Buscar personaje..." />
          <ul>
            <li><a className="ancor-navbar1" href="/">Inicio</a></li>
            <li><a className="ancor-navbar2" href="/agregar">Agregar</a></li>
          </ul>
      </div>
    );
}
export default Navbar;