export class Licence{
    id?:number;
    customer_name="";
    machine_name="";
    machine_key="";
    request_date: Date=new Date();
    isValid?:boolean;
    machine_no?:number;
}