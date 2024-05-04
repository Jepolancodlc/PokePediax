import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './Pages/home/home.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { FilterCompComponent } from './Components/filter-comp/filter-comp.component';
import {MatCardModule} from '@angular/material/card';
import { CardComponent } from './Components/card/card.component';
import { PkdetailComponent } from './Pages/home/pkdetail/pkdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilterCompComponent,
    CardComponent,
    PkdetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
