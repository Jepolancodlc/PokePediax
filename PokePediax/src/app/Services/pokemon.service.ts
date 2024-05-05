import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Resultado } from '../Interfaces/pokeApi';
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

  //GET https://pokeapi.co/api/v2/{endpoint}/

  // async getByPage(): Promise<Resultado[]> {
  //   const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  //   const resJson = await res.json();
  //   if (resJson.results.lenght > 0) {
  //     return resJson.results;
  //   } else return [];
  // }

  async getPokemonList(limit: number) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error(error);
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
    this.listaPokemon = await this.getPokemonList(100);

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): Resultado[] {
    const filterValue = value.toLowerCase();
    return this.listaPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(filterValue)
    );
  }
}
