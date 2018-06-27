import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ServiceProviderModel } from "../models/service-provider.model";

@Injectable()
export class ServiceProvidersService {
    constructor(private _httpClient: HttpClient)
    {

    }

    private BASE_URL: string = "https://amtapi20180626012727.azurewebsites.net/api/serviceproviders";
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

    getProviders()
    {
        return this._httpClient.get<ServiceProviderModel[]>(this.BASE_URL);
    }

    saveProvider(provider: ServiceProviderModel)
    {
        return this._httpClient.post(this.BASE_URL, provider, this.httpOptions);
    }

    updateProvider(provider: ServiceProviderModel)
    {
        return this._httpClient.put(this.BASE_URL, provider, this.httpOptions);
    }

    deleteProvider(id: string)
    {
        return this._httpClient.delete(this.BASE_URL+ "/" + id, this.httpOptions);
    }
}