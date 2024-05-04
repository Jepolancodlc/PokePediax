import { Component, Input, SimpleChanges } from '@angular/core';
import { Resultado } from '../../Interfaces/pokeApi';
import { PokemonService } from '../../Services/pokemon.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() data?:Resultado;
  id:string = '0'
  idPadStart = '0'

  constructor(private pokemonService: PokemonService){}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.extraerInfo()
    this.idPadStart = this.id.padStart(4, "0");

  }
  extraerInfo(){
    if(this.data?.url){
      // this.id = this.data.url.substring(34, this.data.url.length-1)
      this.id = this.data.url.split('/')[6]
    }
  }

}
