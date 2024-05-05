import { Component } from '@angular/core';
import { PokemonService } from '../../../Services/pokemon.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  constructor(public pokemonService: PokemonService) {}
}
