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

  getColorForType(type: string): string {
    switch (type) {
      case 'grass':
        return '#7ED957'; // Green
      case 'fire':
        return '#FF914D'; // Orange
      case 'water':
        return '#38B6FF'; // Blue
      case 'bug':
        return '#3E721D'; // Green
      case 'normal':
        return '#AFAFAD'; // Gray
      case 'poison':
        return '#8C52FF'; // Purple
      case 'electric':
        return '#EFCA35'; // Yellow
      case 'ground':
        return '#9B5635'; // Brown
      case 'fairy':
        return '#FFC0CB'; // Pink
      case 'fighting':
        return '#FF3131'; // Brown
      case 'psychic':
        return '#CB6CE6'; // Purple
      case 'rock':
        return '#B2935B'; // Brown
      case 'steel':
        return '#737373'; // Gray
      case 'ice':
        return '#5CE1E6'; // Light blue
      case 'ghost':
        return '#3A2366'; // Purple
      case 'dragon':
        return '#BEDD8B'; // Purple
      case 'dark':
        return '#393838'; // Black
      case 'flying':
        return '#0097B2'; // Sky blue
      default:
        return '#AFAFAD'; // Gray (Color por defecto si el tipo no coincide)
    }
  }
}
