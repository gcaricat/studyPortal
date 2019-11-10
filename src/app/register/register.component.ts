import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../login/login.service";
import {User} from "../models/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [LoginService, ApiService]
})
export class RegisterComponent implements OnInit {

  email: String = '';
  password: String = '';
  private user = new User();

  constructor(
    private router: Router,
    private apiService: ApiService,
    private loginService: LoginService,
  )
  {

    if ( this.loginService.isLogged() ) {
      this.router.navigate(['dashboard']);
    }
    this.user = new User();
  }
  ngOnInit() {
  }

  onFormSubmitRegister(f: NgForm){

    console.debug(f.value);

    var error = 0;
    const arrError = [];

    if(f.value.email === '' ){
      error = 1;
      arrError.push('Email');
    }

    if(f.value.password === ''){
      error = 1;
      arrError.push('password');
    }

    if(!error) {

      const arrUser: object = [
        {
          "email": f.value.email,
          "password": f.value.password
        }
      ];

      console.log(arrUser);

      console.log(arrUser);
      this.apiService.addUser(
        JSON.parse(
          JSON.stringify(
            arrUser[0]
          )
        )
      ).subscribe(
        res=>{
          console.log("ciao",this);
        },
        error1 => {
          console.log('errore', error1);
          if (error1.status === 201) {
            this.user.setEmail(f.value.email);
            this.user.password = f.value.password;
            f.reset();
            this.sleep(4000);

            this.loginService.validateLogin(this.user).subscribe(
              result => {
                // Handle result
                console.log('logged');
                this.loginService.setToken(result); this.loginService.isLoggedIn$ = this.loginService.isLogged();
                this.router.navigate(['/dashboard']);
              },
              error => {

                switch ( error.status ) {
                  case '404':
                    alert('Error!Wrong Email or password');
                    break;
                  default:
                    alert('Login Error!');
                    break;
                }
              },
              () => {
                // 'onCompleted' callback.

                // No errors, route to new page h
                // this.router.navigateByUrl('/dashboard');

              }
            );


          } else {
            console.log("critical error response post-add");
          }
        }
      );
    }else {
      alert('Error insert a value into'+arrError.join(","))
    }


  }


  sleep(milliseconds) {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

}
