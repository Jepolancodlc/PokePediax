import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, map, of, startWith } from 'rxjs';
import { Option, Resultado } from '../Interfaces/pokeApi';
import { Pokemon } from '../Interfaces/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor() {}

  async getPokemonList(limit: number) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
      const data = await response.json();

      // Mapear la respuesta para obtener los detalles de cada Pokémon
      const pokemonList: Resultado[] = await Promise.all(
        data.results.map(async (pokemon: Resultado) => {
          const pokemonDataResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonDataResponse.json();
          const types = pokemonData.types.map((type: any) => type.type.name);
          return {
            id: pokemonData.id,
            name: pokemon.name,
            url: pokemon.url,
            types: types,
          };
        })
      );

      return pokemonList;
    } catch (error) {
      console.error(error);
      throw error; // Agregar este retorno para manejar errores correctamente
    }
  }

  async getPokemonById(id: string): Promise<Pokemon> {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
