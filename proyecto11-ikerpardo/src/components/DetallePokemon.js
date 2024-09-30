import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DetallePokemon = ({ pokemons = [] }) => {
    const { nombre } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [indice, setIndice] = useState(0);

    useEffect(() => {
        const obtenerPokemon = async () => {
            const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
            const data = await respuesta.json();
            setPokemon(data);
        };

        obtenerPokemon();

        const pokemonIndice = pokemons.findIndex(p => p.name === nombre);
        setIndice(pokemonIndice);
    }, [nombre, pokemons]);

    const navegarA = (nuevoIndice) => {
        if (nuevoIndice >= 0 && nuevoIndice < pokemons.length) {
            navigate(`/pokemon/${pokemons[nuevoIndice].name}`);
        }
    };

    if (!pokemon) return <div>Cargando...</div>;

    const tipos = pokemon.types.map(tipo => tipo.type.name);
    const textoTipo = tipos.length > 1 ? 'Tipos' : 'Tipo';

    return (
        <div className="detalle-pokemon">
            <h2>Detalle de {pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Peso: {pokemon.weight / 10} kg</p>
            <p>Altura: {pokemon.height / 10} m</p>
            <p>{textoTipo}: {tipos.join(', ')}</p>

            <div className="navegacion-pokemon">
                <button onClick={() => navegarA(indice - 1)} disabled={indice <= 0}>
                    Pokémon Anterior
                </button>
                <button onClick={() => navegarA(indice + 1)} disabled={indice >= pokemons.length - 1}>
                    Pokémon Siguiente
                </button>
            </div>
        </div>
    );
};

export default DetallePokemon;
