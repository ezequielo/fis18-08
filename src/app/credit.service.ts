import { Injectable } from '@angular/core';
import { Credit } from './credit';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})  
export class CreditsService {

  serverUrl = "/api/v1/credits";

  constructor(private httpClient: HttpClient) { }

  getCredits(): Observable<Credit[]> {
    return this.httpClient.get<Credit[]>(this.serverUrl);    
  }

  createCredit(credit: Credit): Observable<Credit> {
    return this.httpClient.post<Credit>(this.serverUrl, credit);
  }

  editCredit(credit: Credit): Observable<Credit> {
    const url = `${this.serverUrl}/${credit._id}`;
    return this.httpClient.put<Credit>(url, credit);
  }

  deleteCredit(id: String): Observable<{}> {
    const url = `${this.serverUrl}/${id}`;
    return this.httpClient.delete<{}>(url);
  }

}