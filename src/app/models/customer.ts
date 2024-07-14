export class Customer{
    id?:Number;
    musteriAdi="";
    musteriAdres= "";
    ilId?: Number;
    ilceId?: Number;
    vergiDairesiId?: Number;
    musteriVergiNo= "";
    kayitTarihi: Date=new Date();
    guncellemeAlabilir?: boolean;
    kullanabilir?: boolean;
    lisansBitisTarihi: Date=new Date();
    yetkiliAdi= "";
    yetkiliTelefon= "";
}