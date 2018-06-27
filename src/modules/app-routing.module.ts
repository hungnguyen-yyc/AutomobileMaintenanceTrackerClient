import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehiclesComponent } from '../components/vehicles/vehicles.component';
import { ServicesComponent } from '../components/services/services.component';
import { ServiceProvidersComponent } from '../components/service-providers/service-providers.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', redirectTo: '/vehicles', pathMatch: 'full' },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'providers', component: ServiceProvidersComponent},
  { path: '**',   component: PageNotFoundComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [VehiclesComponent, ServiceProvidersComponent, ServicesComponent, PageNotFoundComponent]