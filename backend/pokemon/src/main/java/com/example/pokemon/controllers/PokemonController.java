package com.example.pokemon.controllers;

import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.pokemon.models.Pokemon;
import com.example.pokemon.repositories.PokemonRepository;

import reactor.core.publisher.Mono;

@CrossOrigin(origins = "http://localhost:3000") // allow requests from our react client
@RestController
public class PokemonController {

    @Autowired
    private PokemonRepository pokemonRepository;

    private WebClient webClient = WebClient.create();

    @GetMapping("/collection")
    public List<Pokemon> getCollection() {
        return (List<Pokemon>) pokemonRepository.findAll();
    }

    @PostMapping("/capture")
    public void capturePokemon(@RequestBody Pokemon pokemon) {
        pokemonRepository.save(pokemon);
    }

    @GetMapping("/server-pokemon")
    public Mono<Pokemon> getServerPokemon() {
        // fetch the total count of pokemon species
        return webClient.get()
            .uri("https://pokeapi.co/api/v2/pokemon-species")
            .retrieve()
            .bodyToMono(Map.class)
            .flatMap(speciesData -> {
                int count = (int) speciesData.get("count");
                int randomId = new Random().nextInt(count) + 1;

                return webClient.get()
                    .uri("https://pokeapi.co/api/v2/pokemon/" + randomId)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .map(pokemonData -> {
                        String name = (String) pokemonData.get("name");
                        // String imageUrl = (String) ((Map) ((List) pokemonData.get("sprites")).get(0)).get("front_default"); // Extract the image URL.
                        String imageUrl = (String) ((Map) pokemonData.get("sprites")).get("front_default");

                        return new Pokemon(name, imageUrl);
                    });
            });
    }
}
