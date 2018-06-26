export class ServiceProviderModel {

    public shop: string;
    public address: string;
    public phone: string;
    public id: string;
    public lastUpdated: string;

    validate():string{
        var error = "";
        if (this.shop == undefined || this.shop.length === 0){
            error += "Invalid Shop<br>";
        }
        if (this.address == undefined || this.address.length === 0){
            error += "Invalid Name<br>";
        }
        if (this.phone == undefined || this.phone.length === 0){
            error += "Invalid Phone<br>";
        }
        return error;
    }
}