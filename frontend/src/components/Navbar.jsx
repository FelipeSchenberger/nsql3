import React from "react";
import '../styles/Navbar.css';
import Marvel_Logo from '../assets/marvel.svg';
import DC_Logo from '../assets/dc.png';

function Navbar() {
    return (
      <div className="navbar">
        <div className="navbar-container">
          <a href="/marvel"><img className="img-navbar1" src={Marvel_Logo} alt="Marvel" /> </a>
          <h1 className="title-navbar">x</h1>
          <a href="/dc"><img className="img-navbar2" src={DC_Logo} alt="DC" /> </a>
        </div>
        <div>
          <ul>
            <li><a className="ancor-navbar1" href="/">Inicio</a></li>
            <li><a className="ancor-navbar2" href="/agregar">Agregar</a></li>
          </ul>
        </div>
      </div>
    );
}
export default Navbar;