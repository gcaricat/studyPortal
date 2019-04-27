import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login/login.service';

/**
 * Component used to control the header
 */

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [LoginService],
})
export class HeaderComponent implements OnInit {

  constructor(public loginService: LoginService) {}

  ngOnInit() {
  }

    /**
     * Function that activate the logout after the click event of the logout button
     */
   onLogout() {
    this.loginService.logout();
  }

}
