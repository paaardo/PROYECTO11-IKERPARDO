import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ListaPokemon from './components/ListaPokemon';
import DetallePokemon from './components/DetallePokemon';

const App = () => {
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 10;

    useEffect(() => {
        const obtenerPokemons = async () => {
            const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
            const data = await respuesta.json();
            setPokemons(data.results);
        };

        obtenerPokemons();
    }, [offset]);

    const siguienteLista = () => {
        setOffset(prevOffset => prevOffset + limit);
    };

    const anteriorLista = () => {
        setOffset(prevOffset => Math.max(prevOffset - limit, 0));
    };

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<h1>Bienvenido a la Pokedex</h1>} />
                <Route 
                    path="/pokemon" 
                    element={
                        <ListaPokemon 
                            pokemons={pokemons} 
                            siguienteLista={siguienteLista} 
                            anteriorLista={anteriorLista} 
                        />
                    } 
                />
                <Route 
                    path="/pokemon/:nombre" 
                    element={<DetallePokemon pokemons={pokemons} />} 
                />
            </Routes>
        </Router>
    );
};

export default App;
