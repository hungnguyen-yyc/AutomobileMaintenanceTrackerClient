import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ServiceProvidersService } from './service-providers.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ServiceProviderModel } from '../models/service-provider.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-service-providers',
  templateUrl: './service-providers.component.html',
  styleUrls: ['./service-providers.component.css'],
  providers: [ServiceProvidersService]
})
export class ServiceProvidersComponent implements AfterViewInit {

  displayedColumns = ['select', 'shop', 'address', 'phone'];
  datasource = new MatTableDataSource();
  providers: ServiceProviderModel[];
  keys: any[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  error: string = "";

  constructor(private _serivce: ServiceProvidersService) { }

  ngAfterViewInit() {
    this.getProviders();
  }

  getProviders(){
    this._serivce.getProviders().subscribe((data: ServiceProviderModel[]) => {
      this.providers = data;
      this.updateDatasource();
    },
      error => {
        console.log(error);
      }
    );
  }

  deleteProviders(){
    this.selection.selected.forEach(item => {
      var index = this.providers.indexOf(item, 0);
      if (index > -1) {
        this.providers.splice(index, 1);
      }
      this._serivce.deleteProvider(item.id).subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error)
      );
    });
    this.updateDatasource();
  }

  saveProviders(){
    this.datasource.data.forEach(provider => {
      if((<ServiceProviderModel>provider).id != null && (<ServiceProviderModel>provider).id != undefined){
        this._serivce.updateProvider(<ServiceProviderModel>provider).subscribe(
          data => {
            console.log(data);
          },
          error => console.log(error)
        );
      }
      else {
        this._serivce.saveProvider(<ServiceProviderModel>provider).subscribe(
          data => {
            console.log(data);
          },
          error => console.log(error)
        );
      }
    });
  }

  newProvider(){
    if(this.error.trim().length > 0) return;
    var provider = new ServiceProviderModel();
    this.providers.push(provider);
    this.error = provider.validate();
    this.updateDatasource();
  }

  validate(obj:any){
    let provider = new ServiceProviderModel();
    provider.address = obj.address;
    provider.shop = obj.shop;
    provider.phone = obj.phone;
    this.error = provider.validate();
  }

  selection = new SelectionModel<ServiceProviderModel>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.datasource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.datasource.data.forEach(row => this.selection.select(<ServiceProviderModel>row));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.datasource.filter = filterValue;
  }

  updateDatasource(){
    this.datasource = new MatTableDataSource(this.providers);
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }
}
