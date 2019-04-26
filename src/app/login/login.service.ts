import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../models/user.model';
import {Router} from '@angular/router';

/**
 * Token used to identificate the user
 */
const TOKEN = null;

@Injectable()
export class LoginService {
  /**
   * true if user is logged
   */
  isLoggedIn$ = false;

  /**
   * Instantiate two object of HttpClient and Router class
   * @param http instance of angular class HttpClient  used to rests api on the XMLHttpRequest
   * @param router instance of angular class Router used to routing throught components or external pages
   */
  constructor(private http: HttpClient, private router: Router ) {
    this.isLoggedIn$ = this.isLogged();
  }

  /**
   * Send  post username and password and if authenticate return the token in text format
   * @param user
   */
  validateLogin(user: User) {
    return this.http.post('https://sheltered-plains-85717.herokuapp.com/api/session', {
      username : user.username,
      password : user.password
    }, { responseType: 'text' } );

  }

  /**
   * Set the token into llocalstorage const
   * @param token
   */
  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  /**
   * Return true if user is authenticate - token !) null
   */
  isLogged() {
      return localStorage.getItem(TOKEN) != null;
  }

  /**
   * Return the token
   */
  getToken() {
    return localStorage.getItem(TOKEN);
  }

  /**
   * Logout to the application
   * cear the localstorage and return into the login page
   */
  logout() {
    localStorage.removeItem(TOKEN);
    localStorage.clear();
    this.isLoggedIn$ = this.isLogged();
    this.router.navigate(['']);
  }

}


