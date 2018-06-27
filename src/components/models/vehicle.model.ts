export class VehicleModel {

    public odometer: number;
    public make: string;
    public year: number;
    public model: string;
    public plate: string;
    public type: VehicleTypeEnum;
    public typeName: string;
    public id: string;
    public lastUpdated: string;

    validate():string{
        var error = "";
        if (this.make == undefined || this.make.trim().length === 0){
            error += "Invalid Make<br>";
        }
        if (this.model == undefined || this.model.trim().length === 0){
            error += "Invalid Model<br>";
        }
        if (this.plate == undefined || this.plate.trim().length === 0){
            error += "Invalid Plate<br>";
        }
        if (this.year == undefined || this.year < 0 || isNaN(this.year)){
            error += "Invalid Year<br>";
        }
        if (this.odometer == undefined || this.odometer < 0 || isNaN(this.odometer)){
            error += "Invalid Odometer<br>";
        }
        return error;
    }
}

export enum VehicleTypeEnum{
    Electric = 1,
    Gas,
    Diesel
}