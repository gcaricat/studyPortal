import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ROUTING } from './app.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RootComponent } from './root/root.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostsComponent } from './posts/posts.component';
import {PostsAddComponent} from './posts-add/posts-add.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentsAddComponent } from './comments-add/comments-add.component';
import { RegisterComponent } from './register/register.component';
import {EmbedVideo} from 'ngx-embed-video/dist';
import { UserAddComponent } from './user-add/user-add.component';
import {ModalModule, TabsModule, BsDatepickerModule} from 'ngx-bootstrap';
import { UserModifyComponent } from './user-modify/user-modify.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ImageCropperModule} from "ngx-image-cropper";
import {DatePipe} from '@angular/common';
import { UserDeleteComponent } from './user-delete/user-delete.component';


@NgModule({
  declarations: [
    RootComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PostsComponent,
    PostsAddComponent,
    CommentsComponent,
    CommentsAddComponent,
    RegisterComponent,
    UserAddComponent,
    UserModifyComponent,
    UserDeleteComponent,
  ],
  imports: [
    BrowserModule,
    ROUTING,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    EmbedVideo.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ImageCropperModule,
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
