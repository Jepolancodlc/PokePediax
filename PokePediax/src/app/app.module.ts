import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FiltersComponent } from './Components/Sidenav/filters/filters.component';
import { CardComponent } from './Components/card/card.component';
import { FilterCompComponent } from './Components/filter-comp/filter-comp.component';
import { HomeComponent } from './Pages/home/home.component';
import { PkdetailComponent } from './Pages/pkdetail/pkdetail.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilterCompComponent,
    CardComponent,
    PkdetailComponent,
    FiltersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
