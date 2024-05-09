import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, map, of, startWith } from 'rxjs';
import { Option, Resultado } from '../Interfaces/pokeApi';
import { Pokemon } from '../Interfaces/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  listaPokemon: Resultado[] = [];
  myControl = new FormControl('');
  filteredOptions: Observable<Resultado[]> | undefined;

  constructor() {
    this.cargarLista();
  }

  async getPokemonList(limit: number) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
      );
      const data = await response.json();

      // Mapear la respuesta para obtener los detalles de cada Pokémon
      const pokemonList: Resultado[] = await Promise.all(
        data.results.map(async (pokemon: Resultado) => {
          const pokemonDataResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonDataResponse.json();
          const types = pokemonData.types.map((type: any) => type.type.name);
          return {
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

  async cargarLista() {
    this.listaPokemon = await this.getPokemonList(1000);
    console.log(this.tiposSelecionados);
    
    this.filteredOptions = combineLatest([
      this.myControl.valueChanges.pipe(startWith('')),
      of(this.tiposSelecionados)
    ]).pipe(
      map(([value, _]) => this._filter(value || ''))
    );
  }

  private _filter(value: string): Resultado[] {
    const filterValue = value.toLowerCase();
    return this.listaPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(filterValue) &&
      this._checkSelectedTypes(pokemon)
    );
  }
  
private _checkSelectedTypes(pokemon: Resultado): boolean {
  // Si no hay tipos seleccionados, siempre retorna true
  if (this.tiposSelecionados.length === 0) {
    return true;
  }
  
  // Verificar si el pokemon tiene ambos tipos seleccionados
  return this.tiposSelecionados.every(selectedType => pokemon.types.includes(selectedType));
}
  
  options: Option[] = [
    { value: 'fire', checked: false },
    { value: 'normal', checked: false },
    { value: 'grass', checked: false },
    { value: 'water', checked: false },
    { value: 'electric', checked: false },
    { value: 'ice', checked: false },
    { value: 'fighting', checked: false },
    { value: 'poison', checked: false },
    { value: 'ground', checked: false },
    { value: 'flying', checked: false },
    { value: 'psychic', checked: false },
    { value: 'bug', checked: false },
    { value: 'rock', checked: false },
    { value: 'ghost', checked: false },
    { value: 'dark', checked: false },
    { value: 'dragon', checked: false },
    { value: 'steel', checked: false },
    { value: 'fairy', checked: false },
  ];

  disableCheckboxes = false;
  tiposSelecionados: string[] = [];


  updateSelectedOptions(optionClicked: Option) {
    const selectedCount = this.options.filter((option) => option.checked).length;
    this.disableCheckboxes = selectedCount >= 2;
  
    this.tiposSelecionados = this.options
      .filter((option) => option.checked)
      .map((option) => option.value);
    
    console.log(this.tiposSelecionados);
  
    // Actualizar la lista de Pokémon
    this.filteredOptions = combineLatest([
      this.myControl.valueChanges.pipe(startWith('')),
      of(this.tiposSelecionados)
    ]).pipe(
      map(([value, _]) => this._filter(value || ''))
    );
  }
}
