import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../models/user.model';
import {Router} from '@angular/router';

const TOKEN = null;

@Injectable()
export class LoginService {

  isLoggedIn$ = false;
  constructor(private http: HttpClient, private router: Router ) {
    this.isLoggedIn$ = this.isLogged();
  }

  validateLogin(user: User) {
    return this.http.post('https://sheltered-plains-85717.herokuapp.com/api/session', {
      username : user.username,
      password : user.password
    }, { responseType: 'text' } );

  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

   isLogged() {

      return localStorage.getItem(TOKEN) != null;
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  logout() {
    localStorage.removeItem(TOKEN);
    localStorage.clear();
    this.isLoggedIn$ = this.isLogged();
    this.router.navigate(['']);
  }

}


