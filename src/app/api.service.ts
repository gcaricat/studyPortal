import { Injectable } from '@angular/core';
// import {Observable, ObservableInput} from 'rxjs';
// import {catchError, tap, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginService} from './login/login.service';
import {Observable} from 'rxjs';
import {User} from './models/user.model';
import {Posts} from './models/posts.model';

const httpOptions =  {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

/**
 * Constant that contain the base url of the api
 */
const apiUrl = 'https://sheltered-plains-85717.herokuapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private loginService: LoginService) { }

  /**
   * throught the user token into X-Auth header  send the get request to get information about logged user
   */
  getUser(): Observable<User> {
    const url = `${apiUrl}/user`;
    return this.http.get<User>(url, {
      headers: { 'X-Auth': this.loginService.getToken() }
    });
  }

  /**
   * Send get request to get all posts
   */
  getPosts(): Observable<Posts[]> {
    const url = `${apiUrl}/posts`;
    return this.http.get<Posts[]>(url);
  }

  /**
   * Get username throught user userId
   *
   */
  getSingleAuthor(userId): Observable<User> {
    const url = `${apiUrl}/user/${userId}`;
    return this.http.get<User>(url);
  }
}







