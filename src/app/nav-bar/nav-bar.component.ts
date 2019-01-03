import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
  }

  isUserLoggedIn() {
    return this.tokenService.getToken() !== null; 
  }

  login() {
    if (this.isUserLoggedIn()) {
      this.router.navigateByUrl('/credits');
    }
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigateByUrl('/login');
  }

}
