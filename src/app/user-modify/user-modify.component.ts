import { Component, Input, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {DomSanitizer} from '@angular/platform-browser';
import {ImageCroppedEvent} from 'ngx-image-cropper';


@Component({
  selector: 'app-user-modify',
  templateUrl: './user-modify.component.html',
  styleUrls: ['./user-modify.component.css'],
  providers: [FormBuilder, SidebarComponent]
})
export class UserModifyComponent implements OnInit {

  public showNoImage: Boolean = true;

  imageChangedEvent: any = '';
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
  ) {

  }

  ngOnInit() {
  }

  modifyUser(f: NgForm) {

    compressImage(this.croppedImage, 100, 100).then(compressed => {
      this.croppedImage = compressed;
    });

    const USERJSON = {
        firstName: f.value.firstName,
        lastName: f.value.lastName,
        dateOfBirth: f.value.dateOfBirth,
        profilImage: this.croppedImage
      };

    this.apiService.modifyUser(
      USERJSON,
      this.sideBar.user.getUserId()
    )
      .subscribe(
      res => {

      },
      error => {
        console.log('ErrorUser', error);
        if (error.status === 200 || error.status === 201) {
          f.reset();
          // location.reload();
        } else {
          console.log('critical error response user-modify');
        }
      }
    );
  }

}

function compressImage(src, newX, newY) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const elem = document.createElement('canvas');
      elem.width = newX;
      elem.height = newY;
      const ctx = elem.getContext('2d');
      ctx.drawImage(img, 0, 0, newX, newY);
      const data = ctx.canvas.toDataURL();
      res(data);
    };
    img.onerror = error => rej(error);
  });
}
