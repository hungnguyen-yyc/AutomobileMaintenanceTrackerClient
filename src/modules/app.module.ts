import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from '../components/app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServicesComponent } from '../components/services/services.component';
import { ServiceProvidersComponent } from '../components/service-providers/service-providers.component';
import { VehiclesComponent } from '../components/vehicles/vehicles.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { VehiclesService } from '../components/vehicles/vehicles.service';

@NgModule({
  declarations: [
    AppComponent,
    ServicesComponent,
    ServiceProvidersComponent,
    VehiclesComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [VehiclesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
