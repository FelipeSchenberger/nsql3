import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const [heroes, setHeroes] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:5000/api/heroes')
      .then((res) => res.json())
      .then((data) => {
        const universePath = location.pathname === '/dc' ? 'dc' : location.pathname === '/marvel' ? 'marvel' : null;
        const filteredHeroes = universePath
          ? data.filter(hero => hero.universe.toLowerCase() === universePath)
          : data;
        setHeroes(filteredHeroes);
      })
      .catch((err) => console.error('Error fetching heroes:', err));
  }, [location]);

  return (
    <div className='home-container'>
      <h1 className='home-title'>Bienvenido a la galería de personajes de Marvel y DC</h1>
  
      {heroes.length === 0 ? (
        <p className='no-heroes'>No hay personajes disponibles.</p>
      ) : (
        <div className='heros-cards-container'>
          {heroes.map((hero) => (
            <div key={hero._id} className="hero-card">
              {/* <img className='img-card' src={hero.images.split(',')[0]} alt={hero.character} /> */}
              <img
                className='img-card'
                src={hero.images ? hero.images.split(',')[0] : 'ruta-a-imagen-default.jpg'}
                alt={hero.character}
              />
              <h2 className='title-card'>{hero.character}</h2>
              <p className='name-card'>{hero.name}</p>
              <p className='description-card'>{hero.description}</p>
              <a href={`/detalle/${hero._id}`}><button className='button-card'>Ver Más</button></a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;