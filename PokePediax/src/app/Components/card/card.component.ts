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
}
