package com.example.pokemon.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.pokemon.models.Pokemon;

public interface PokemonRepository extends CrudRepository<Pokemon, Long> {
    
}
