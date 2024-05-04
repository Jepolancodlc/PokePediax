import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../Services/pokemon.service';
import { Pokemon } from '../../Interfaces/pokemon';

@Component({
  selector: 'app-pkdetail',
  templateUrl: './pkdetail.component.html',
  styleUrl: './pkdetail.component.scss',
})
export class PkdetailComponent implements OnInit {
  nombrePokemon?: string | null;
  pokemonSelect?: Pokemon;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      this.nombrePokemon = params.get('nombre');
    });

    try {
      this.pokemonSelect = await this.pokemonService.getPokemonById(this.nombrePokemon!);
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  }
}
