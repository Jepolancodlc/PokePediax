import { Component, Input, SimpleChanges } from '@angular/core';
import { Resultado } from '../../Interfaces/pokeApi';
import { Pokemon } from '../../Interfaces/pokemon';
import { SvcFilterService } from '../../Services/svc-filter.service';

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

  constructor(public svcFilterService: SvcFilterService) {}

  ngOnChanges(): void {
    this.id = this.data?.id;
    this.idPadStart = (this.id ?? '').toString().padStart(4, '0');
  }
}
