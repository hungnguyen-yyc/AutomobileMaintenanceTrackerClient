import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ServiceModel, MaintenanceTypeEnum } from '../models/service.model';
import { ServicesService } from './services.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ServiceProvidersService } from '../service-providers/service-providers.service';
import { VehiclesService } from '../vehicles/vehicles.service';
import { VehicleModel } from '../models/vehicle.model';
import { ServiceProviderModel } from '../models/service-provider.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  providers: [ServicesService, ServiceProvidersService, VehiclesService]
})
export class ServicesComponent implements AfterViewInit {
  displayedColumns = ['select', 'provider', 'vehicle', 'odometer', 'type', 'cost', 'note', 'date'];
  datasource = new MatTableDataSource();
  services: ServiceModel[] = [];
  vehicles: VehicleModel[] = [];
  providers: ServiceProviderModel[] = [];
  keys: any[];
  serviceTypes = MaintenanceTypeEnum;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  error: string = "";

  constructor(private _serivce: ServicesService, private _providerService: ServiceProvidersService, private _vehicleService: VehiclesService) { 
    this.keys = Object.keys(this.serviceTypes).filter(Number);
    console.log(this.keys);
  }

  ngAfterViewInit() {
    this.getProviders();
  }

  getProviders(){
    this._providerService.getProviders().subscribe((data: ServiceProviderModel[]) => {
      if(data != null){
        this.providers = data;
        this.updateDatasource();
        this.getVehicles();
      }
    },
      error => {
        this.error = error;
      }
    );
  }

  getVehicles(){
    this._vehicleService.getVehicles().subscribe((data: VehicleModel[]) => {
      if(data != null){
        this.vehicles = data;
        this.updateDatasource();
        this.getServices();
      }
    },
      error => {
        this.error = error;
      }
    );
  }

  getServices(){
    this._serivce.getServices().subscribe((data: ServiceModel[]) => {
      if(data != null){
        this.services = data;
        this.updateDatasource();
      }
    },
      error => {
        this.error = error;
      }
    );
  }

  deleteServices(){
    this.selection.selected.forEach(item => {
      var index = this.services.indexOf(item, 0);
      if (index > -1) {
        this.services.splice(index, 1);
      }
      this._serivce.deleteService(item.id).subscribe(
        data => {
          if((<any>data).isError){
            this.error = (<any>data).message;
          }
        },
        error => this.error = error
      );
    });
    this.updateDatasource();
  }

  saveServices(){
    if(this.error.trim().length > 0) return;
    this.datasource.data.forEach(service => {
      if((<ServiceModel>service).id != null && (<ServiceModel>service).id != undefined){
        this._serivce.updateService(<ServiceModel>service).subscribe(
          data => {
            if((<any>data).isError){
              this.error = (<any>data).message;
            }
          },
          error => this.error = error
        );
      }
      else {
        this._serivce.saveService(<ServiceModel>service).subscribe(
          data => {
            if((<any>data).isError){
              this.error = (<any>data).message;
            }
          },
          error => this.error = error
        );
      }
    });
  }

  newService(){
    if(this.vehicles.length == 0 || this.providers.length == 0){
      alert("Please make sure to create Vehicle and Provider before Service creation");
      return;
    }
    if(this.error.trim().length > 0) return;
    var service = new ServiceModel();
    service.provider = this.providers[0].id;
    service.vehicle = this.vehicles[0].id;
    service.type = MaintenanceTypeEnum.BrakeChange;
    this.services.push(service);
    this.error = service.validate();
    this.updateDatasource();
  }

  validate(obj:any){
    let service = new ServiceModel();
    service.cost = obj.cost;
    service.note = obj.note;
    service.provider = obj.provider;
    service.type = obj.type;
    service.vehicle = obj.vehicle;
    service.date = obj.date
    service.odometer = obj.odometer;
    this.error = service.validate();
  }

  selection = new SelectionModel<ServiceModel>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.datasource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.datasource.data.forEach(row => this.selection.select(<ServiceModel>row));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.datasource.filter = filterValue;
  }

  updateDatasource(){
    this.datasource = new MatTableDataSource(this.services);
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

}
