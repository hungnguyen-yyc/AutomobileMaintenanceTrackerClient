import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ServiceProviderModel } from "../models/service-provider.model";

@Injectable()
export class ServiceProvidersService {
    constructor(private _httpClient: HttpClient)
    {

    }

    private BASE_URL: string = "http://localhost:3000/api/serviceproviders";//"https://amtapi20180626012727.azurewebsites.net/api/vehicles";
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

    getProviders()
    {
        return this._httpClient.get<ServiceProviderModel[]>(this.BASE_URL);
    }

    saveProvider(vehicle: ServiceProviderModel)
    {
        return this._httpClient.post(this.BASE_URL, vehicle, this.httpOptions);
    }

    updateProvider(vehicle: ServiceProviderModel)
    {
        return this._httpClient.put(this.BASE_URL, vehicle, this.httpOptions);
    }

    deleteProvider(id: string)
    {
        return this._httpClient.delete(this.BASE_URL+ "/" + id, this.httpOptions);
    }
}