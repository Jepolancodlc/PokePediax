import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../Services/pokemon.service';
import { Resultado } from '../../Interfaces/pokeApi';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  listaPokemon: Resultado[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.cargarLista();
  }

  async cargarLista() {
    this.listaPokemon = [
      ...this.listaPokemon,
      ...(await this.pokemonService.getPokemonList(100)),
    ];
  }
}
