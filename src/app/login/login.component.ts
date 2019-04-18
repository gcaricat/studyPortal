import { Component } from '@angular/core';
import {LoginService} from './login.service';
import {User} from '../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent {
  public user: User;


  constructor(private loginService: LoginService, private router: Router) {
    this.user = new User();
  }

  validateLogin() {

    if (this.user.username && this.user.password) {

      this.loginService.validateLogin(this.user).subscribe(
        result => {
          // Handle result
          console.log('logged');
          this.loginService.setToken(result);
          this.loginService.isLoggedIn$ = this.loginService.isLogged();
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
      alert('enter user name and password');
    }
  }




}


