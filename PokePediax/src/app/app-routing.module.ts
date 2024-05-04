import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { PkdetailComponent } from './Pages/home/pkdetail/pkdetail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pokemon/:nombre', component: PkdetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
