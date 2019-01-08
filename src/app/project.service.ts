import { Injectable } from '@angular/core';
import { Project } from './project';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  serverUrl = "/api/v1/projects";

  headers = new HttpHeaders().set("apikey", this.tokenService.getToken());

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  getProject(id: string): Observable<Project> {
    const headers = this.headers;
    const url = `${this.serverUrl}/${id}`;
    return this.httpClient.get<Project>(url, {headers});    
  }

}
