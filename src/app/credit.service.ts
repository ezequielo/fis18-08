import { Injectable } from '@angular/core';
import { Credit } from './credit';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditsService {

  serverUrl = "http://localhost:3000/api/v1";

  constructor(private httpClient: HttpClient) { }

  getCredits(): Observable<Credit[]> {
    const url = this.serverUrl + "/credits";
    return this.httpClient.get<Credit[]>(url);    
  }
}