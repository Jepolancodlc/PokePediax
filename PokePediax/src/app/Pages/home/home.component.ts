import { Component } from '@angular/core';
import { PokemonService } from '../../Services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent{
  constructor(public pokemonService: PokemonService) {}
}