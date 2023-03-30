import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/components/home-page/home-page.component';
import { DetailsPageComponent } from './pages/components/details-page/details-page.component';

const routes: Routes = [
  {
    path: 'informations/:id',
    component: DetailsPageComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
