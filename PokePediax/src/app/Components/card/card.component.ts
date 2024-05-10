import { Component, Input, SimpleChanges } from '@angular/core';
import { Resultado } from '../../Interfaces/pokeApi';
import { PokemonService } from '../../Services/pokemon.service';
import { Pokemon } from '../../Interfaces/pokemon';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() data?: Resultado;
  id?: string;
  idPadStart = '0';
  pokemonSelect?: Pokemon;

  ngOnChanges(changes: SimpleChanges): void {
    this.id = this.data?.id;
    this.idPadStart = (this.id ?? '').toString().padStart(4, '0');
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
  getColorForTypes(types: string[]): string[] {
    if (types.length === 1) {
      return [this.getColorForType(types[0]), this.getColorForType(types[0])];
    } else {
      return types.map((type) => this.getColorForType(type));
    }
  }
}
