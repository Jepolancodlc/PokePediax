import { ChangeDetectorRef, Component } from '@angular/core';
import { SvcFilterService } from './Services/svc-filter.service';
import { PokemonService } from './Services/pokemon.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-angular-app';
  backgroundColor = 'white';

  constructor(private colorService: PokemonService, private cdr: ChangeDetectorRef,     private router: Router
  ) { }
  ngOnInit() {
    // Observar los cambios de ruta y ajustar el color en consecuencia
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url.includes('/pokemon/')) {
        // Si la URL incluye '/pokemon/', significa que estás en pkdetail
        // Por lo tanto, establecemos el color basado en el servicio de color
        this.colorService.color$.subscribe(color => {
          this.backgroundColor = color;
          this.cdr.detectChanges();
        });
      } else {
        // Si no estás en pkdetail, establecemos el color como blanco
        this.backgroundColor = 'white';
        this.cdr.detectChanges();
      }
    });
  }
}