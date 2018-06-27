import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ServiceModel } from "../models/service.model";

@Injectable()
export class ServicesService {
    constructor(private _httpClient: HttpClient)
    {

    }

    private BASE_URL: string = "https://amtapi20180626012727.azurewebsites.net/api/services";
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

    getServices()
    {
        return this._httpClient.get<ServiceModel[]>(this.BASE_URL);
    }

    saveService(service: ServiceModel)
    {
        console.log(service);
        return this._httpClient.post(this.BASE_URL, service, this.httpOptions);
    }

    updateService(service: ServiceModel)
    {
        return this._httpClient.put(this.BASE_URL, service, this.httpOptions);
    }

    deleteService(id: string)
    {
        return this._httpClient.delete(this.BASE_URL+ "/" + id, this.httpOptions);
    }
}