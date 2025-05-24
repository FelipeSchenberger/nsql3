import React, { useState } from 'react';
import '../styles/AgregarCharacter.css';

const AgregarCharacter = () => {
  const [character, setCharacter] = useState('');
  const [name, setName] = useState('');
  const [universe, setUniverse] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [equipment, setEquipment] = useState('');
  const [images, setImages] = useState('');
  const [imgSrc, setImgSrc] = useState('/assets/default.png');

  const formatearNombre = (nombre) => {
    if (!nombre) return '';
    return nombre
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ /g, '_');
  };

  const handleCharacterChange = (e) => {
    const value = e.target.value;
    setCharacter(value);
    const formatted = formatearNombre(value);
    if (formatted.length >= 3) {
      setImgSrc(`/assets/${formatted}.png`);
    } else {
      setImgSrc('/assets/default.png');
    }
  };

  const handleImgError = () => {
    setImgSrc('/assets/default.png');
  };

  return (
    <div className="agregar-character-container" style={{ display: 'flex', minHeight: '60vh' }}>
      {/* Izquierda: Imagen */}
      <div className="agregar-character-img" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
        <img
          src={imgSrc}
          alt={character || 'default'}
          style={{ maxWidth: '80%', maxHeight: '400px', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 2px 8px #0002' }}
          onError={handleImgError}
        />
      </div>

      {/* Derecha: Formulario */}
      <div className="agregar-character-form" style={{ flex: 1, padding: '2rem' }}>
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
            images
          };

          fetch('http://localhost:5000/api/heroes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCharacter)
          })
            .then(res => res.json())
            .then(data => {
              console.log('Personaje agregado:', data)
            })
            .catch(err => {
              console.error('Error:', err)
            })
        }}>
          <input
            type="text"
            placeholder="Personaje"
            onChange={handleCharacterChange}
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
}

export default AgregarCharacter;
