import {Component, OnInit, TemplateRef} from '@angular/core';
import {User} from '../models/user.model';
import {Message} from '../models/message';
import {ApiService} from '../api.service';
import {BsModalService, BsModalRef, TabsModule} from "ngx-bootstrap";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  providers: [
    ApiService
  ]
})
export class UsersListComponent implements OnInit {

  public listUser: [] = [];
  modalRef: BsModalRef;

  constructor(
    private apiService: ApiService,
    private modalService: BsModalService
  ) {



  }

  openChatModal(template: TemplateRef<any>)
  {

    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, {class: 'modal-lg'})
    );

  }

  closeModal(){
    this.modalRef.hide();
  }

  ngOnInit() {
    this.apiService.getUser()
      .subscribe(res => {
        const currentID = res._id;

        this.apiService.getAllUser().subscribe(
          (userData: User[]) => {

            for ( const item of userData ) {

              if(item._id === currentID){
                continue;
              }

              const user_id = item._id;
              const firstName = (typeof item.firstName !== 'undefined') ? item.firstName : '';
              const lastName = (typeof item.lastName !== 'undefined') ? item.lastName : '';
              const email = (typeof item.email !== 'undefined') ? item.email : '';
              const role = (typeof item.role !== 'undefined') ? item.role : '';
              const profileImage = (typeof item.profilImage !== 'undefined' || item.profilImage !== '') ? item.profilImage : '';

              const single_user = [];
              single_user['user_id'] = user_id;
              single_user['firstName'] = firstName;
              single_user['lastName'] = lastName;
              single_user['email'] = email;
              single_user['role'] = role;
              single_user['profileImage'] = profileImage;
              this.apiService.getMessage(currentID).subscribe(
                (messageData: Message[]) => {

                  for(const item_message of messageData){

                    if(item_message.authorId === user_id){

                      const currentDate = item_message.date;

                      const date =  new Date(+(currentDate.match(/\d+/)[0]));

                      const formattedDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
                      const hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
                      const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
                      const formattedTime = hours + ':' + minutes;
                      const sendDate = formattedDate + ' ' + formattedTime;

                      single_user['message_date'] = sendDate;
                      single_user['message_status'] = item_message.status;
                      single_user['message_title'] = item_message.title;
                      single_user['message_body'] = item_message.body;
                      break;
                    }
                  }

                }
              );
              this.listUser.push(single_user);
            }
          }
        );


      }, err => {


      });





    console.log("messaggi", this.listUser);

  }
}
