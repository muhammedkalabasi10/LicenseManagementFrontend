import { Injectable } from '@angular/core';
import { Licence } from '../models/licence';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class LicenceService {
  url="license";
  constructor(private http: HttpClient) { }

  public getLicences():Observable<Licence[]>{
    return this.http.get<Licence[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(`${environment.apiUrl}/${this.url}/customers`);
  }

  public updateLicence(licence: Licence):Observable<Licence[]>{
    return this.http.put<Licence[]>(`${environment.apiUrl}/${this.url}`,licence);
  }

  public createLicence(licence: Licence):Observable<Licence[]>{
    return this.http.post<Licence[]>(`${environment.apiUrl}/${this.url}`,licence);
  }

  public deleteLicence(licence: Licence):Observable<Licence[]>{
    return this.http.delete<Licence[]>(`${environment.apiUrl}/${this.url}/${licence.id}`);
  }
}
