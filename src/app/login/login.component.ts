import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApikeyService } from '../apikey.service';
import { TokenService } from '../token.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apikeyService: ApikeyService, private tokenService: TokenService, private router: Router) { }

  user: string = null;
  password: string = null;


  ngOnInit() {
  }

  tryLogin() {
    this.apikeyService.login(this.user, this.password)
      .subscribe( (apikey) => {
          if (apikey.token) {
            this.tokenService.setToken(apikey.token);
            this.router.navigateByUrl('/credits');
          } else {
            console.error("Unable to login")
          }
      });
  }

}
