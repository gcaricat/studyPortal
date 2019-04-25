import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login/login.service';
import {CanActivate, Router} from '@angular/router';
import {ApiService} from '../api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [LoginService, ApiService]

})
export class DashboardComponent implements OnInit {


  isLoadingResults = true;

   constructor(private loginService: LoginService, private router: Router) { }


  ngOnInit() {

    if ( !this.loginService.isLogged() ) {
      this.router.navigate(['login']);
    }


  }

}
