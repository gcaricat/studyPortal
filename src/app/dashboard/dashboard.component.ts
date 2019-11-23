import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login/login.service';
import {CanActivate, Router} from '@angular/router';
import {ApiService} from '../api.service';

/**
 * Component of dashboard page, first page after login
 */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [LoginService, ApiService]

})
export class DashboardComponent implements OnInit {

  /**
   * Constructor that instantiate two object parameter
   * @param loginService instance of class LoginService that contain functions to login control
   * @param router instance of angular class Router that used to routing throught components
   */
   constructor(
     private loginService: LoginService,
     private router: Router
  ) { }

  /**
   * First operations when we are loged to the page
   * check if the user is logged else return to the login page
   */
  ngOnInit() {

    if ( !this.loginService.isLogged() ) {
      // this.router.navigate(['login']);
      this.router.navigate(['']);
    }
  }

}
