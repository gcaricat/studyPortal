import { Component, OnInit, Input } from '@angular/core';
import {ApiService} from "../api.service";
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {LoginService} from "../login/login.service";
import {UserAddComponent} from "../user-add/user-add.component";

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css'],
  providers: [
    FormBuilder,
    SidebarComponent
  ]
})
export class UserDeleteComponent implements OnInit {

  constructor(
    private router: Router,
    private apiService: ApiService,
    public sideBar: SidebarComponent,
    private loginService: LoginService,
    private userAddComponent: UserAddComponent
  )
  {

  }

  ngOnInit() {
  }


  deleteUser(f: NgForm)
  {
    const inputDeleteProfile = f.value.inputDeleteProfile;

    if(inputDeleteProfile === "DELETE"){

      this.apiService.deleteUser(
        this.sideBar.user.getUserId()
      ).subscribe(
        res => {
          f.reset();
          this.userAddComponent.modalRef.hide();
          this.loginService.logout();
        },
        error => {
          console.log('ErrorUser', error);
          if (error.status === 200 || error.status === 201) {
            f.reset();

            this.loginService.logout();
          } else {
            console.log('critical error response user-modify');
          }
        }
      );

    }else{
      alert("To delete the profile write DELETE in the input and click on the delete button!");
    }

  }

}
