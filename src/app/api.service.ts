import { Injectable } from '@angular/core';
// import {Observable, ObservableInput} from 'rxjs';
// import {catchError, tap, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginService} from './login/login.service';
import {Observable} from "rxjs";
import {User} from './models/user.model';
import {Posts} from './models/posts.model';

const httpOptions =  {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

const apiUrl = 'https://sheltered-plains-85717.herokuapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public firstPage: string = "";
  public prevPage: string = "";
  public nextPage: string = "";
  public lastPage: string = "";

  constructor(private http: HttpClient, private loginService: LoginService) { }
  /*
  private handleHerror<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);

      return of(result as T);
    };
  }
*/
  getUser(): Observable<User> {
    const url = `${apiUrl}/user`;
    return this.http.get<User>(url, {
      headers: { 'X-Auth': this.loginService.getToken() }
    });
  }
/*
  getPosts(): Observable<Posts[]>{
    const url = `${apiUrl}/posts`;
    return this.http.get<Posts[]>(url);
  }
  */
  getPosts(): Observable<Posts[]>{
    const url = `${apiUrl}/posts`;
    return this.http.get<Posts[]>(url);
  }

  getSingleAuthor(userId): Observable<User> {
    const url = `${apiUrl}/user/${userId}`;
    return this.http.get<User>(url);
  }
}







