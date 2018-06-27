import { ServiceProviderModel } from "./service-provider.model";
import { VehicleModel } from "./vehicle.model";

export class ServiceModel {

    public provider: string;
    public vehicle: string;
    public cost: number;
    public note: string = "";
    public type: MaintenanceTypeEnum;
    public odometer: number;
    public id: string;
    public lastUpdated: string;
    public date: string;

    validate():string{
        var error = "";
        if(this.provider == undefined || this.provider.trim().length < 0){
            error += "Invalid Provider<br>";
        }
        if(this.vehicle == undefined || this.vehicle.trim().length < 0){
            error += "Invalid Vehicle<br>";
        }
        if (this.cost == undefined || this.cost < 0 || isNaN(this.cost)){
            error += "Invalid Cost<br>";
        }
        if (this.odometer == undefined || this.odometer < 0 || isNaN(this.odometer)){
            error += "Invalid Odometer<br>";
        }
        if (this.date == undefined || this.date.length < 0 || isNaN(Date.parse(this.date))){
            error += "Invalid Date<br>";
        }
        return error;
    }
}

export enum MaintenanceTypeEnum
{
    OilChange = 1,
    TireChange,
    TireRotation,
    BrakeChange,
    FluidCheck,
    BatteryChange,
}