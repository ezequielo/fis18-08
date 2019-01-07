import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApikeyService } from '../apikey.service';
import { TokenService } from '../token.service';
import {  FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apikeyService: ApikeyService, private tokenService: TokenService, private router: Router,
    private fb: FormBuilder) { }

  user: string = null;
  password: string = null;

  loginForm = this.fb.group({
    user: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit() {
  }

  onSubmit() {
    this.user = this.loginForm.value.user;
    this.password = this.loginForm.value.password;
    this.tryLogin();
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
