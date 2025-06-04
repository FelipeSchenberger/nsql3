import React, { useState, useEffect } from 'react';
import SuccessMessage from "../components/SuccessMessage";
import ErrorMessage from '../components/ErrorMessage';
import '../styles/AgregarCharacter.css';
import { useNavigate } from 'react-router-dom';

const AgregarCharacter = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [character, setCharacter] = useState('');
  const [name, setName] = useState('');
  const [universe, setUniverse] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [equipment, setEquipment] = useState('');
  const [images, setImages] = useState(['/assets/default.png']);
  const [logoActual, setLogoActual] = useState('/assets/default2.png');
  const [universeLogo, setUniverseLogo] = useState('/assets/default2.png');
  const [imagenActual, setImagenActual] = useState(0);
  const navigate = useNavigate();

  const formatearNombre = (nombre) => {
    if (!nombre) return '';
    return nombre
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ /g, '_');
  };

  const formatearUniverse = (universe) => {
    if (!universe) return '';
    return universe
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

  const actualizarLogoUniverso = (universe) => {
    const base = formatearUniverse(universe);
    const universoLogo = `/assets/${base}logo.png`;
    const img = new Image();
    img.src = universoLogo;
    img.onload = () => setUniverseLogo(universoLogo);
    img.onerror = () => setUniverseLogo('/assets/default2.png');
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
      actualizarLogoUniverso(value);
    } else {
      setImages(['/assets/default.png']);
      setLogoActual('/assets/default2.png');
      setUniverseLogo('/assets/default2.png');
    }
  };

  const handleUniverseChange = (e) => {
    const value = e.target.value;
    setUniverse(value);
    actualizarLogoUniverso(value);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (!character || !universe || !year || !description || !equipment) {
      setShowError(true); // Mostrar animación de error
      setTimeout(() => {
        setShowError(false);
      }, 3000); // Ocultar animación después de 3 segundos
      console.error('Todos los campos obligatorios deben estar completos.');
      return; // Detener el envío del formulario
    }

    const formattedUniverse = formatearUniverse(universe);
    const newCharacter = {
      character,
      name, // Este campo puede estar vacío
      universe: formattedUniverse,
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
        setShowSuccess(true); // Mostrar animación de éxito
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/');
        }, 3000);
      })
      .catch((err) => {
        console.error('Error:', err);
        setShowError(true); // Mostrar animación de error
        setTimeout(() => {
          setShowError(false);
        }, 3000); // Ocultar animación después de 3 segundos
      });
  };

  return (
    <div className="agregar-character-container">
      {showSuccess && <SuccessMessage showVideo={showSuccess} onClose={() => setShowSuccess(false)} />}
      {showError && <ErrorMessage showVideo={showError} onClose={() => setShowError(false)} />} {/* Mostrar animación de error */}
      <div className="agregar-character-img">
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
        <form className="form-agregar" onSubmit={handleSubmit}>
          <input className='input-character'
            type="text"
            placeholder="Personaje"
            onChange={handleCharacterChange}
          />
          <img className='logo-character'
            src={logoActual}
            alt={character}
          />
          <input className='input-character'
            type="text"
            placeholder="Nombre"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className='input-character'
            type="text"
            placeholder="Universo"
            onChange={handleUniverseChange}
          />
          <img className='logo-universe'
            src={universeLogo}
            alt={universe}
          />
          <input className='input-character'
            type="text"
            placeholder="Año"
            onChange={(e) => setYear(e.target.value)}
          />
          <input className='input-character'
            type="text"
            placeholder="Descripción"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input className='input-character'
            type="text"
            
            placeholder="Equipo"
            onChange={(e) => setEquipment(e.target.value)}
          />
          <button className="button-agregar" type="submit">Agregar</button>
        </form>
      </div>
    </div>
  );
};

export default AgregarCharacter;
