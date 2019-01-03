import { Injectable } from '@angular/core';

const TOKEN = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setToken(token: string): void {
    console.info("Logged in, token: " + token)
    localStorage.setItem(TOKEN, token);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  removeToken(): void {
    console.info("Session eneded");
    localStorage.removeItem(TOKEN);
  }

  isLogged() {
    return localStorage.getItem(TOKEN) != null;
  }

}
