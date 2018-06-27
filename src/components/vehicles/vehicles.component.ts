import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { VehiclesService } from './vehicles.service';
import { VehicleModel, VehicleTypeEnum } from '../models/vehicle.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
  providers: [VehiclesService]
})
export class VehiclesComponent implements AfterViewInit {
  displayedColumns = ['select', 'make', 'model', 'plate', 'year', 'odometer', 'type'];
  datasource = new MatTableDataSource();
  vehicles: VehicleModel[];
  keys: any[];
  vehicleTypes = VehicleTypeEnum;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  error: string = "";

  constructor(private _serivce: VehiclesService) { 
    this.keys = Object.keys(this.vehicleTypes).filter(Number);
  }

  ngAfterViewInit() {
    this.getVehicles();
  }

  getVehicles(){
    this._serivce.getVehicles().subscribe((data: VehicleModel[]) => {
      this.vehicles = data;
      this.updateDatasource();
    },
      error => {
        this.error = error;
      }
    );
  }

  deleteVehicles(){
    this.selection.selected.forEach(item => {
      var index = this.vehicles.indexOf(item, 0);
      if (index > -1) {
        this.vehicles.splice(index, 1);
      }
      this._serivce.deleteVehicle(item.id).subscribe(
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

  saveVehicles(){
    this.datasource.data.forEach(vehicle => {
      if((<VehicleModel>vehicle).id != null && (<VehicleModel>vehicle).id != undefined){
        this._serivce.updateVehicle(<VehicleModel>vehicle).subscribe(
          data => {
            if((<any>data).isError){
              this.error = (<any>data).message;
            }
          },
          error => console.log(error)
        );
      }
      else {
        this._serivce.saveVehicle(<VehicleModel>vehicle).subscribe(
          data => {
            if((<any>data).isError){
              this.error = (<any>data).message;
            }
          },
          error => console.log(error)
        );
      }
    });
  }

  newVehicle(){
    if(this.error.trim().length > 0) return;
    var vehicle = new VehicleModel();
    vehicle.type = VehicleTypeEnum.Electric;
    this.vehicles.splice(0, 0, vehicle);
    this.error = vehicle.validate();
    this.updateDatasource();
  }

  validate(obj:any){
    let vehicle = new VehicleModel();
    vehicle.odometer = obj.odometer;
    vehicle.make = obj.make;
    vehicle.plate = obj.plate;
    vehicle.type = obj.type;
    vehicle.model = obj.model;
    vehicle.year = obj.year;
    this.error = vehicle.validate();
  }

  selection = new SelectionModel<VehicleModel>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.datasource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.datasource.data.forEach(row => this.selection.select(<VehicleModel>row));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.datasource.filter = filterValue;
  }

  updateDatasource(){
    this.datasource = new MatTableDataSource(this.vehicles);
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }
}