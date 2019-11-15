import { Component, Input, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {DomSanitizer} from "@angular/platform-browser";
import {ImageCroppedEvent} from "ngx-image-cropper";


@Component({
  selector: 'app-user-modify',
  templateUrl: './user-modify.component.html',
  styleUrls: ['./user-modify.component.css'],
  providers: [FormBuilder, SidebarComponent]
})
export class UserModifyComponent implements OnInit {

  selectedFile = File;
  private ImageBase64: String = '';
  imageUrl64: any;
  public showNoImage: Boolean = true;

  imageChangeEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.showNoImage = false;
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  constructor(
    private router: Router,
    private apiService: ApiService,
    public sideBar: SidebarComponent,
    private domSanitizer: DomSanitizer
  )
  {

  }

  ngOnInit() {
  }

  modifyUser(f: NgForm){
    console.debug(f);
    const arrUser: object = [
      {
        "fistName": f.value.fistName,
        "lastName": f.value.lastName,
        "dateOfBirth": f.value.dateOfBirth,
        "profilImage": this.croppedImage
      }
    ];

    this.apiService.modifyUser(
      JSON.parse(JSON.stringify(arrUser)) ,
      this.sideBar.user.getUserId()
    ).subscribe(
      res =>{

      },
      error => {
        console.log("error", error);
      }
    );
  }

  // onFileChanged(event) {
  //   var files = event.target.files;
  //   var file = files[0];
  //   this.selectedFile = file;
  //   if (files && file) {
  //     var reader = new FileReader();
  //     reader.onload = this._handleReaderLoaded.bind(this);
  //     reader.readAsBinaryString(file);
  //   }
  //
  // }
  //
  // onUpload(){
  // }
  //
  // _handleReaderLoaded(readerEvt) {
  //   var binaryString = readerEvt.target.result;
  //   this.ImageBase64= btoa(binaryString);
  //   this.imageUrl64 = this.ImageBase64;
  //   this.showNoImage = false;
  // }

}
