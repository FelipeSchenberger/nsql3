import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SuccessMessage from "../components/SuccessMessage";
import ErrorMessage from "../components/ErrorMessage";
import '../styles/AgregarCharacter.css';

const UpdateCharacter = () => {
  const { id } = useParams();
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
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/heroes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data.character);
        setName(data.name);
        setUniverse(data.universe);
        setYear(data.year);
        setDescription(data.description);
        setEquipment(data.equipment);
        setImages(data.images.split(','));
        actualizarLogo(data.character);
        actualizarLogoUniverso(data.universe);
      })
      .catch((err) => {
        console.error('Error fetching character:', err);
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      });
  }, [id]);

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
    const universoLogo = `/assets/${base}.png`;
    const img = new Image();
    img.src = universoLogo;
    img.onload = () => setUniverseLogo(universoLogo);
    img.onerror = () => setUniverseLogo('/assets/default2.png');
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCharacter = {
      character,
      name,
      universe,
      year,
      description,
      equipment,
      images: images.join(',')
    };

    fetch(`http://localhost:5000/api/heroes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedCharacter)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Personaje actualizado:', data);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/');
        }, 3000);
      })
      .catch((err) => {
        console.error('Error al actualizar el personaje:', err);
        setShowError(true);
        setTimeout(() => setShowError(false), 3000); 
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/api/heroes/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Personaje eliminado:', data);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/');
        }, 3000);
      })
      .catch((err) => {
        console.error('Error al eliminar el personaje:', err);
        setShowError(true); 
        setTimeout(() => setShowError(false), 3000);
      });
  };

  return (
    <div className="agregar-character-container">
      {showSuccess && <SuccessMessage showVideo={showSuccess} onClose={() => setShowSuccess(false)} />}
      {showError && <ErrorMessage showVideo={showError} onClose={() => setShowError(false)} />} 
      <div className="agregar-character-img">
        <img className='img-character' src={images[0]} alt={character || 'default'} />
      </div>

      <div className="agregar-character-form">
        <h1 className="title-agregar">Actualizar Personaje</h1>
        <form className="form-agregar" onSubmit={handleSubmit}>
          <input
            className='input-character'
            type="text"
            placeholder="Personaje"
            value={character}
            onChange={(e) => setCharacter(e.target.value)}
          />
          <img className='logo-character' src={logoActual} alt={character} />
          <input
            className='input-character'
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className='input-character'
            type="text"
            placeholder="Universo"
            value={universe}
            onChange={(e) => setUniverse(e.target.value)}
          />
          <img className='logo-universe' src={universeLogo} alt={universe} />
          <input
            className='input-character'
            type="text"
            placeholder="Año"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <input
            className='input-character'
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className='input-character'
            type="text"
            placeholder="Equipo"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
          />
          <div className='button-container'>
            <button className="button-update" type="submit" onClick={handleSubmit}>Actualizar</button>
            <button className="button-delete" onClick={handleDelete}>Eliminar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCharacter;
