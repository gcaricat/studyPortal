import { Component } from '@angular/core';
import {LoginService} from './login.service';
import {User} from '../models/user.model';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';

/**
 * Component used to manage the user login
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, ApiService]
})
export class LoginComponent {
  public user: User;

  /**
   * Check the user login
   * if user is logged routing in dashboard and create a new User
   * @param loginService
   * @param router
   * @param apiService
   */
  constructor(private loginService: LoginService, private router: Router, private apiService: ApiService) {
    if ( this.loginService.isLogged() ) {
      this.router.navigate(['dashboard']);
    }
    this.user = new User();
  }

  /**
   * Login validation
   */
  validateLogin() {

    if (this.user.username && this.user.password) {
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
      alert('enter user name and password');
    }
  }



}


