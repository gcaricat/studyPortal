import { Component, OnInit } from '@angular/core';
import {User} from '../models/user.model';
import {ApiService} from '../api.service';
import {DatePipe} from '@angular/common';

/**
 * Used to manage the sidebar
 */

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [
    ApiService,
    DatePipe
  ]
})
export class SidebarComponent implements OnInit {

  public user: User;

    /**
     * Get the user information via api and initialize user, instance of class User
     * @param apiService
     */
  constructor(
    private apiService: ApiService,
    public datepipe: DatePipe
    ) {
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
          this.user.setImageProfile(res.profilImage);
          this.user.setFirstName(res.firstName);
          this.user.setLastName(res.lastName);
          this.user.setDateOfBirth(
            this.datepipe.transform(res.dateOfBirth, 'dd-MM-yyyy')
          );

        }, err => {
          console.log("dashboard err ", err);

        });

    console.log(this.user);
  }


  ngOnInit() {

  }

}
