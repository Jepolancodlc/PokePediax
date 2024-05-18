import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, map, of, startWith } from 'rxjs';
import { BasicInfo, Resultado } from '../Interfaces/pokeApi';
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
  basicInfo: BasicInfo[] = [
    'fire',
    'water',
    'grass',
    'electric',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dark',
    'dragon',
    'steel',
    'fairy',
    'normal',
  ].map((value) => ({
    value,
    checked: false,
    emblem: `assets/Images/tipos_logos/${value}.png`,
    color: this.getColorForType(value).color,
    icon: this.getColorForType(value).icon,
  }));

  constructor(public pokemonService: PokemonService) {
    this.cargarLista();
  }

  async cargarLista() {
    this.listaPokemon = await this.pokemonService.getPokemonList(300);
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

  updateSelectedOptions(optionClicked: BasicInfo) {
    const selectedCount = this.basicInfo.filter(
      (basicInfo) => basicInfo.checked
    ).length;
    this.disableCheckboxes = selectedCount >= 2;

    this.tiposSelecionados = this.basicInfo
      .filter((basicInfo) => basicInfo.checked)
      .map((basicInfo) => basicInfo.value);

    console.log(this.tiposSelecionados);

    // Actualizar la lista de Pokémon
    this.filteredOptions = combineLatest([
      this.myControl.valueChanges.pipe(startWith('')),
      of(this.tiposSelecionados),
    ]).pipe(map(([value, _]) => this._filter(value || '')));
  }

  getColorForType(type: string) {
    switch (type) {
      case 'grass':
        return { color: '#7ED957', icon: 'fa-solid fa-leaf' }; // Green
      case 'fire':
        return { color: '#FF914D', icon: 'fa-solid fa-fire' }; // Orange
      case 'water':
        return { color: '#38B6FF', icon: 'fa-solid fa-water' }; // Blue
      case 'bug':
        return { color: '#3E721D', icon: 'fa-solid fa-bug' }; // Green
      case 'normal':
        return { color: '#AFAFAD', icon: 'fa-solid fa-star' }; // Gray
      case 'poison':
        return { color: '#8C52FF', icon: 'fa-solid fa-skull' }; // Purple
      case 'electric':
        return { color: '#EFCA35', icon: 'fa-solid fa-bolt' }; // Yellow
      case 'ground':
        return { color: '#9B5635', icon: 'fa-solid fa-mountain' }; // Brown
      case 'fairy':
        return { color: '#FFC0CB', icon: 'fa-solid fa-heart' }; // Pink
      case 'fighting':
        return { color: '#FF3131', icon: 'fa-solid fa-fist-raised' }; // Brown
      case 'psychic':
        return { color: '#CB6CE6', icon: 'fa-solid fa-brain' }; // Purple
      case 'rock':
        return { color: '#B2935B', icon: 'fa-solid fa-gem' }; // Brown
      case 'steel':
        return { color: '#737373', icon: 'fa-solid fa-shield' }; // Gray
      case 'ice':
        return { color: '#5CE1E6', icon: 'fa-solid fa-snowflake' }; // Light blue
      case 'ghost':
        return { color: '#3A2366', icon: 'fa-solid fa-ghost' }; // Purple
      case 'dragon':
        return { color: '#BEDD8B', icon: 'fa-solid fa-dragon' }; // Purple
      case 'dark':
        return { color: '#393838', icon: 'fa-solid fa-moon' }; // Black
      case 'flying':
        return { color: '#0097B2', icon: 'fa-solid fa-feather' }; // Sky blue
      default:
        return { color: '#AFAFAD', icon: 'fa-solid fa-question-circle' }; // Gray (Icono por defecto si el tipo no coincide)
    }
  }
}
