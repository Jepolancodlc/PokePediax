import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../Services/pokemon.service';
import { Pokemon } from '../../Interfaces/pokemon';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { SvcFilterService } from '../../Services/svc-filter.service';

@Component({
  selector: 'app-pkdetail',
  templateUrl: './pkdetail.component.html',
  styleUrl: './pkdetail.component.scss',
})
export class PkdetailComponent implements OnInit {
  nombrePokemon?: string | null;
  pokemonSelect?: Pokemon;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    public svcFilterService: SvcFilterService
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.nombrePokemon = params.get('nombre');
          return this.pokemonService.getPokemonById(this.nombrePokemon!);
        })
      )
      .subscribe(
        (pokemon) => {
          this.pokemonSelect = pokemon;
        },
        (error) => {
          console.error('Error fetching Pokemon details:', error);
        }
      );
  }
}
