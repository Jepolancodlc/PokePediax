import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, map, of, startWith } from 'rxjs';
import { Resultado, Option } from '../Interfaces/pokeApi';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root',
})
export class SvcFilterService {
  listaPokemon: Resultado[] = [];
  myControl = new FormControl('');
  filteredOptions: Observable<Resultado[]> | undefined;
  disableCheckboxes = false;
  tiposSelecionados: string[] = [];
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
  
  constructor(public pokemonService: PokemonService) {
    this.cargarLista();
  }

  async cargarLista() {
    this.listaPokemon = await this.pokemonService.getPokemonList(1000);
    console.log(this.listaPokemon);

    this.filteredOptions = combineLatest([
      this.myControl.valueChanges.pipe(startWith('')),
      of(this.tiposSelecionados),
    ]).pipe(map(([value, _]) => this._filter(value || '')));
  }

  private _filter(value: string): Resultado[] {
    const filterValue = value.toLowerCase();
    return this.listaPokemon.filter(
      (pokemon) =>
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
    return this.tiposSelecionados.every((selectedType) =>
      pokemon.types.includes(selectedType)
    );
  }

  updateSelectedOptions(optionClicked: Option) {
    const selectedCount = this.options.filter(
      (option) => option.checked
    ).length;
    this.disableCheckboxes = selectedCount >= 2;

    this.tiposSelecionados = this.options
      .filter((option) => option.checked)
      .map((option) => option.value);

    console.log(this.tiposSelecionados);

    // Actualizar la lista de Pokémon
    this.filteredOptions = combineLatest([
      this.myControl.valueChanges.pipe(startWith('')),
      of(this.tiposSelecionados),
    ]).pipe(map(([value, _]) => this._filter(value || '')));
  }
}
