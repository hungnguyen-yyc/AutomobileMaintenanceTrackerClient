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

  displayedColumns = ['select', 'name', 'address', 'phone'];
  datasource = new MatTableDataSource();
  providers: ServiceProviderModel[];
  keys: any[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  error: string = "";
  isLoadingResults = false;

  constructor(private _serivce: ServiceProvidersService) { }

  ngAfterViewInit() {
    this.getProviders();
  }

  getProviders(){
    this.isLoadingResults = true;
    this._serivce.getProviders().subscribe((data: ServiceProviderModel[]) => {
      this.providers = data;
      this.updateDatasource();
      this.isLoadingResults = false;
    },
      error => {
        this.error = error;
        this.isLoadingResults = false;
      }
    );
  }

  deleteProviders(){
    this.isLoadingResults = true;
    this.selection.selected.forEach(item => {
      this._serivce.deleteProvider(item.id).subscribe(
        data => {
          if((<any>data).isError){
            this.error = (<any>data).message;
          }
          else
          {
            var index = this.providers.indexOf(item, 0);
            if (index > -1) {
              this.providers.splice(index, 1);
            }
          }
          this.isLoadingResults = false;
        },
        error => { 
          this.error = error; 
          this.isLoadingResults = false;
        }
      );
    });
    this.updateDatasource();
  }

  saveProviders(){
    this.isLoadingResults = true;
    this.datasource.data.forEach(provider => {
      if((<ServiceProviderModel>provider).id != null && (<ServiceProviderModel>provider).id != undefined){
        this._serivce.updateProvider(<ServiceProviderModel>provider).subscribe(
          data => {
            if((<any>data).isError){
              this.error = (<any>data).message;
            }
            this.isLoadingResults = false;
          },
          error => { 
            this.error = error; 
            this.isLoadingResults = false;
          }
        );
      }
      else {
        this._serivce.saveProvider(<ServiceProviderModel>provider).subscribe(
          data => {
            console.log(data);
            this.isLoadingResults = false;
          },
          error => { 
            this.error = error; 
            this.isLoadingResults = false;
          }
        );
      }
    });
  }

  newProvider(){
    if(this.error.trim().length > 0) return;
    var provider = new ServiceProviderModel();
    this.providers.splice(0, 0, provider);
    this.error = provider.validate();
    this.updateDatasource();
  }

  validate(obj:any){
    let provider = new ServiceProviderModel();
    provider.address = obj.address;
    provider.name = obj.name;
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
