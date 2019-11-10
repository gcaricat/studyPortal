import { Component, OnInit, TemplateRef } from '@angular/core';
import {BsModalService, BsModalRef, TabsModule} from "ngx-bootstrap";
// import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ){

  }

  ngOnInit() {
  }

  openAddUserModal(template: TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg' })
    );

  }

  modifyUser(){

  }

  closeModal(){
    this.modalRef.hide();
  }
}



