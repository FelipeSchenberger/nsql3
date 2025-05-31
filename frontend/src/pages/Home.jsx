import React, { useState, useEffect } from 'react';
import '../styles/Home.css';

function Home() {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/heroes')
      .then((res) => res.json())
      .then((data) => setHeroes(data))
      .catch((err) => console.error('Error fetching heroes:', err));
  }, []);

  return (
    <div className='home-container'>
      <h1 className='home-title'>Bienvenido a la Galería de Personajes de Marvel y DC</h1>
      <div className='heros-cards-container'>
        {heroes.map((hero) => (
          <div key={hero._id} className="hero-card">
            <img className='img-card' src={hero.images.split(',')[0]} alt={hero.character} />
            <h2 className='title-card'>{hero.character}</h2>
            <p className='name-card'>{hero.name}</p>
            <p className='description-card'>{hero.description}</p>
            <button className='button-card'>Ver Más</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;