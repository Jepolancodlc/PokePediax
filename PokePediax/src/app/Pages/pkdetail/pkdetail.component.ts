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
  colorTipo?: string;

  images: any[] = [];
  responsiveOptions: any[] = [];
  showIndicatorsOnItem: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    public svcFilterService: SvcFilterService
  ) {}

  async ngOnInit(): Promise<void> {
    this.initializePokemon();
  }

  private extractSprites(sprites: any): void {
    for (const key in sprites) {
      if (
        sprites[key] &&
        typeof sprites[key] === 'string' &&
        key.includes('front') &&
        !sprites[key].includes('generation')
      ) {
        this.images.push({
          source: sprites[key],
          alt: `Sprite de ${key}`,
          title: `Sprite de ${key}`,
        });
      } else if (sprites[key] && typeof sprites[key] === 'object') {
        this.extractSprites(sprites[key]);
      }
    }
  }

  private initializePokemon(): void {
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
          this.colorTipo = this.svcFilterService.getColorForType(
            this.pokemonSelect?.types?.[0]?.type?.name ?? 'Tipo no disponible'
          ).color;

          // Limpiamos la matriz de imágenes antes de añadir nuevas imágenes
          this.images = [];

          // Extraemos todas las URLs de los sprites disponibles
          if (this.pokemonSelect.sprites) {
            this.extractSprites(this.pokemonSelect.sprites);
          }
        },
        (error) => {
          console.error('Error fetching Pokemon details:', error);
        }
      );
  }
}
