import { Component } from '@angular/core';
import { PokemonService } from '../../../Services/pokemon.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  constructor(private router: Router, public pokemonService: PokemonService) {}

  onPokemonSelected(event: MatAutocompleteSelectedEvent) {
    const pokemonName = event.option.value;
    // Aquí puedes redirigir a la página que desees, por ejemplo:
    this.router.navigate([`/pokemon/${pokemonName}`]);
  }
}
