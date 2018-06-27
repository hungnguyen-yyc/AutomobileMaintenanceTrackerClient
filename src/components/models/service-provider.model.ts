export class ServiceProviderModel {

    public name: string;
    public address: string;
    public phone: string;
    public id: string;
    public lastUpdated: string;

    validate():string{
        var error = "";
        if (this.name == undefined || this.name.trim().length === 0){
            error += "Invalid Shop<br>";
        }
        if (this.address == undefined || this.address.trim().length === 0){
            error += "Invalid Address<br>";
        }
        if (this.phone == undefined || this.phone.trim().length === 0){
            error += "Invalid Phone<br>";
        }
        return error;
    }
}