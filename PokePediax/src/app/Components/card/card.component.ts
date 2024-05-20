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

  colorTipo1?: string;
  colorTipo2?: string;

  constructor(public svcFilterService: SvcFilterService) {}

  ngOnInit(): void {
    if (this.data) {
      this.colorTipo1 = this.svcFilterService.getColorForType(this.data.types[0]).color;
      this.colorTipo2 = this.svcFilterService.getColorForType(this.data.types[1]).color;
    }
  }

  ngOnChanges(): void {
    this.id = this.data?.id;
    this.idPadStart = (this.id ?? '').toString().padStart(4, '0');
  }
}
