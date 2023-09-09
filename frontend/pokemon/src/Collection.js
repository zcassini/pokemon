import React, { useState, useEffect } from "react";
import axios from 'axios';

function Collection() {
    const [pokemonCollection, setPokemonCollection] = useState([]);

    useEffect(() => {
        async function fetchCollection() {
            try {
                const { data } = await axios.get('http://localhost:8080/collection');
                setPokemonCollection(data);
            }
            catch (error) {
                console.error('Error fetching collection: ', error);
            }
        }

        fetchCollection();
    }, []);

    return (
        <div>
            <h2>My Pokemon Collection</h2>
            <ul>
                {pokemonCollection.map( pokemon => (
                    <li key={pokemon.id}>{pokemon.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Collection;