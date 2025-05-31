import React, { useState, useEffect } from 'react';
import '../styles/AgregarCharacter.css';

const AgregarCharacter = () => {
  const [character, setCharacter] = useState('');
  const [name, setName] = useState('');
  const [universe, setUniverse] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [equipment, setEquipment] = useState('');
  const [images, setImages] = useState(['/assets/default.png']);
  const [logoActual, setLogoActual] = useState('/assets/default2.png');
  const [imagenActual, setImagenActual] = useState(0);

  const formatearNombre = (nombre) => {
    if (!nombre) return '';
    return nombre
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ /g, '_');
  };

  const actualizarLogo = (nombre) => {
    const base = formatearNombre(nombre);
    const nuevoLogo = `/assets/${base}.png`;

    const img = new Image();
    img.src = nuevoLogo;
    img.onload = () => setLogoActual(nuevoLogo);
    img.onerror = () => setLogoActual('/assets/default2.png');
  };

  const cargarImagenes = (nombre) => {
    const base = formatearNombre(nombre);
    const nuevas = [];

    for (let i = 1; i <= 3; i++) {
      nuevas.push(`/assets/${base}${i}.png`);
    }

    const promesas = nuevas.map((src) => new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(src);
      img.onerror = () => resolve(null);
    }));

    Promise.all(promesas).then((resultados) => {
      const filtradas = resultados.filter((src) => src !== null);
      setImages(filtradas.length > 0 ? filtradas : ['/assets/default.png']);
    });
  };

  const handleCharacterChange = (e) => {
    const value = e.target.value;
    setCharacter(value);

    if (value.length >= 3) {
      cargarImagenes(value);
      actualizarLogo(value);
    } else {
      setImages(['/assets/default.png']);
      setLogoActual('/assets/default2.png');
    }
  };

  const siguienteImagen = () => {
    setImagenActual((prev) => (prev + 1) % images.length);
  };

  const anteriorImagen = () => {
    setImagenActual((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        siguienteImagen();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images]);

  useEffect(() => {
    setImagenActual(0);
  }, [images]);

  return (
    <div className="agregar-character-container">
      <div className="agregar-character-img" >
        {images.length > 1 && (
          <button onClick={anteriorImagen}>&lt;</button>
        )}
        <img className='img-character'
          src={images[imagenActual]}
          alt={character || 'default'}
        />
        {images.length > 1 && (
          <button className='boton-img-right' onClick={siguienteImagen}>&gt;</button>
        )}
      </div>

      <div className="agregar-character-form">
        <h1 className="title-agregar">Agregar Personaje</h1>
        <form className="form-agregar" onSubmit={(e) => {
          e.preventDefault();
          const newCharacter = {
            character,
            name,
            universe,
            year,
            description,
            equipment,
            images: images.join(',')
          };

          fetch('http://localhost:5000/api/heroes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCharacter)
          })
            .then((res) => res.json())
            .then((data) => {
              console.log('Personaje agregado:', data);
            })
            .catch((err) => {
              console.error('Error:', err);
            });
        }}>
          <input
            type="text"
            placeholder="Personaje"
            onChange={handleCharacterChange}
          />
          <img className='logo-character'
            src={logoActual}
            alt={character}
          />
          <input
            type="text"
            placeholder="Nombre"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Universo"
            onChange={(e) => setUniverse(e.target.value)}
          />
          <input
            type="text"
            placeholder="Año"
            onChange={(e) => setYear(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descripción"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Equipo"
            onChange={(e) => setEquipment(e.target.value)}
          />
          <button type="submit">Agregar</button>
        </form>
      </div>
    </div>
  );
};

export default AgregarCharacter;
