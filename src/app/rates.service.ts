import { Injectable } from '@angular/core';
import { Rate } from './rate';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service'



@Injectable({
  providedIn: 'root'
})
export class RatesService {

  serverUrl = "/api/v1/rates";

  headers = new HttpHeaders().set("apikey", this.tokenService.getToken());

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  getRate(symbol: string): Observable<Rate> {
    const headers = this.headers;
    let url = `${this.serverUrl}/${symbol}`;
    return this.httpClient.get<Rate>(url, {headers});    
  }

}
