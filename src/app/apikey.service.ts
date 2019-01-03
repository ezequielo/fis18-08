import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apikey } from './apikey'


@Injectable({
  providedIn: 'root'
})
export class ApikeyService {

  serverUrl = "/api/v1/login";
  
  constructor(private httpClient: HttpClient) { }

  login(user: string, password: string): Observable<Apikey> {
    return this.httpClient.post<Apikey>(this.serverUrl, {user: user, password: password});
  }

}
