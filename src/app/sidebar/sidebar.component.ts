import { Component, OnInit } from '@angular/core';
import {User} from '../models/user.model';
import {ApiService} from '../api.service';

/**
 * Used to manage the sidebar
 */

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [ApiService]
})
export class SidebarComponent implements OnInit {

  public user: User;

    /**
     * Get the user information via api and initialize user, instance of class User
     * @param apiService
     */
  constructor(private apiService: ApiService) {
    this.user = new User();
    this.apiService.getUser()
        .subscribe(res => {
          var date =  new Date(+(res.registerDate.match(/\d+/)[0]));

          var formattedDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
          var hours = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
          var minutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
          var formattedTime = hours + ":" + minutes;
          this.user.setId(res._id);
          this.user.setDate(formattedDate+" "+formattedTime);
          this.user.setStatus(res.status );
          this.user.setRole(res.role);
          this.user.setUsername(res.email);

        }, err => {
          console.log("dashboard err ", err);

        });
  }


  ngOnInit() {

  }

}
