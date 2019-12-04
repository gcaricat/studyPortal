import { Injectable } from '@angular/core';
// import {Observable, ObservableInput} from 'rxjs';
// import {catchError, tap, map} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {LoginService} from './login/login.service';
import {Observable, of} from 'rxjs';
import {User} from './models/user.model';
import {Posts} from './models/posts.model';
import {Comments} from './models/comments.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'} ),
};


/**
 * Constant that contain the base url of the api
 */
const apiUrl = 'https://student-portal-ajp.herokuapp.com/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  /**
   * Throught the user token into X-Auth header  send the get request to get information about logged user
   */
  getUser(): Observable<User> {
    const url = `${apiUrl}/user`;
    return this.http.get<User>(url, {
      headers: { 'X-Auth': this.loginService.getToken() }
    });
  }

  /**
   * add user
   * @param user: User
   */
  addUser(user): Observable<User> {
    const url =   `${apiUrl}/user/register`;
    const header = {
      headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'} ),
    };

    return this.http.post<User>(url, user, header );
  }

  /**
   * modify the user
   * @param user
   * @param userId
   */
  modifyUser(user, userId) {
    const url = `${apiUrl}/user/${userId}`;
    const header = {
      headers: new HttpHeaders().set("Content-Type", "application/json").append('Authorization', this.loginService.getToken() ),
    };

    return this.http.put(url, user, header );
  }

  deleteUser(userId) {
    const url = `${apiUrl}/user/${userId}`;
    const header = {
      headers: new HttpHeaders().set("Content-Type", "application/json").append('Authorization', this.loginService.getToken() ),
    };

    return this.http.delete(url, header);
  }

  /**
   * Send get request to get all posts
   */
  getPosts(): Observable<Posts[]> {
    const url = `${apiUrl}/posts/all`;
    return this.http.get<Posts[]>(url);
  }

  getCommentsFromPost(postId): Observable<Comments[]> {
    const url = `${apiUrl}/comments/${postId}`;
    return this.http.get<Comments[]>(url);
  }

  addPosts(posts): Observable<Posts> {
    const url =   `${apiUrl}/post/new`;
    const header = {
      headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'} ).append('Authorization', this.loginService.getToken() ),
    };

    return this.http.post<Posts>(url, posts, header );
  }

  addComments(comments): Observable<Comments> {
    const url =   `${apiUrl}/comment/new`;
    const header = {
      headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'} ).append('Authorization', this.loginService.getToken() ),
    };

    return this.http.post<Comments>(url, comments, header );
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







