import React from 'react';
import { useState } from 'react'
import '../styles/AgregarCharacter.css';


const AgregarCharacter = () => {
    const [character, setCharacter] = useState();
    const [name, setName] = useState();
    const [universe, setUniverse] = useState();
    const [year, setYear] = useState();
    const [description, setDescription] = useState();
    const [equipment, setEquipment] = useState();
    const [images, setImages] = useState();
  return (
    <div>
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
            }
            console.log(newCharacter);
        }}>
            <input type="text" placeholder="Personaje" onChange={(e) => setCharacter(e.target.value)} />
            <input type="text" placeholder="Nombre" onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Universo" onChange={(e) => setUniverse(e.target.value)} />
            <input type="text" placeholder="Año" onChange={(e) => setYear(e.target.value)} />
            <input type="text" placeholder="Descripción" onChange={(e) => setDescription(e.target.value)} />
            <input type="text" placeholder="Equipo" onChange={(e) => setEquipment(e.target.value)} />
            <input type="text" placeholder="Imagenes" onChange={(e) => setImages(e.target.value)} />
            <button type="submit">Agregar</button>
        </form>
    </div>
  );
}

export default AgregarCharacter;