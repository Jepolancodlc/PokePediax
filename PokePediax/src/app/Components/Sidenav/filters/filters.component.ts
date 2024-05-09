import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { PokemonService } from '../../../Services/pokemon.service';
import { SvcFilterService } from '../../../Services/svc-filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  constructor(private router: Router, public svcFilterService: SvcFilterService) {}

  onPokemonSelected(event: MatAutocompleteSelectedEvent) {
    const pokemonName = event.option.value;
    this.router.navigate([`/pokemon/${pokemonName}`]);
  }
}
