import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RandomPokemon() {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchRandomPokemon = async () => {
        setLoading(true);
        try {
            const { data: speciesData } = await axios.get('https://pokeapi.co/api/v2/pokemon-species');
            const randomId = Math.floor(Math.random() * speciesData.count) + 1;
            const { data: pokemonData } = await axios.get('https://pokeapi.co/api/v2/pokemon/' + randomId);
            setPokemon(pokemonData);
        }
        catch (error) {
            console.error('Error fetching random Pokemon:', error);
        }
        finally {
            setLoading(false);
        }
    }

    const capturePokemon = async () => {
        if (!pokemon) return;
        try {
            await axios.post('http://localhost:8080/capture', { name: pokemon.name, imageUrl: pokemon.sprites.front_default });
            alert('Pokemon captured!')
        }
        catch (error) {
            console.error('Error catching Pokemon', error);
        }
    }

    useEffect(() => {
        fetchRandomPokemon();
    }, []);

    return (
        <div>
            {loading 
                ? ( <p>Loading...</p>)
                : (
                    <div>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <p>You encountered a {pokemon.name}!</p>
                        <button onClick={capturePokemon}>Capture Pokemon</button>
                        <button onClick={fetchRandomPokemon}>Get another Pokemon</button>
                    </div>
                )
            }
        </div>
    )
}

export default RandomPokemon;