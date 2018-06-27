import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { VehicleModel } from "../models/vehicle.model";

@Injectable()
export class VehiclesService {
    constructor(private _httpClient: HttpClient)
    {

    }

    private BASE_URL: string = "http://localhost:3000/api/vehicles";//"https://amtapi20180626012727.azurewebsites.net/api/vehicles";
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };

    getVehicles()
    {
        return this._httpClient.get<VehicleModel[]>(this.BASE_URL);
    }

    saveVehicle(vehicle: VehicleModel)
    {
        return this._httpClient.post(this.BASE_URL, vehicle, this.httpOptions);
    }

    updateVehicle(vehicle: VehicleModel)
    {
        return this._httpClient.put(this.BASE_URL, vehicle, this.httpOptions);
    }

    deleteVehicle(id: string)
    {
        return this._httpClient.delete(this.BASE_URL+ "/" + id, this.httpOptions);
    }
}