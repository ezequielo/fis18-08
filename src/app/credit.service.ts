import { Injectable } from '@angular/core';
import { Credit } from './credit';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service'


@Injectable({
  providedIn: 'root'
})  
export class CreditsService {

  serverUrl = "/api/v1/credits";

  headers = new HttpHeaders().set("apikey", this.tokenService.getToken());


  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  getCredits(): Observable<Credit[]> {
    const headers = this.headers;
    return this.httpClient.get<Credit[]>(this.serverUrl, {headers});    
  }

  getCredit(id: string): Observable<Credit> {
    const headers = this.headers;
    const url = `${this.serverUrl}/${id}`;
    return this.httpClient.get<Credit>(url, {headers});    
  }

  createCredit(credit: Credit): Observable<Credit> {
    const headers = this.headers;
    return this.httpClient.post<Credit>(this.serverUrl, credit, {headers});
  }

  editCredit(credit: Credit): Observable<Credit> {
    const headers = this.headers;
    const url = `${this.serverUrl}/${credit._id}`;
    return this.httpClient.put<Credit>(url, credit, {headers});
  }

  deleteCredit(id: String): Observable<{}> {
    const headers = this.headers;
    const url = `${this.serverUrl}/${id}`;
    return this.httpClient.delete<{}>(url, {headers});
  }

}