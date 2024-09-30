import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ListaPokemon = ({ pokemons, siguienteLista, anteriorLista }) => {
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        if (pokemons.length > 0) {
            setCargando(false);
        }
    }, [pokemons]);

    if (cargando) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <div className="titulo-container">
                <h1 className="titulo-pokemon">Lista de Pokémon</h1>
            </div>
            <ul>
                {pokemons.map((pokemon, index) => (
                    <li className="pokemon-container" key={index}>
                        <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={anteriorLista} disabled={pokemons.length < 10}>
                    Anterior
                </button>
                <button onClick={siguienteLista}>
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default ListaPokemon;
