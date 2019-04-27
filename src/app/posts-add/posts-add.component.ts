import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {Posts} from "../models/posts.model";
import {PostsComponent} from "../posts/posts.component";

@Component({
  selector: 'app-posts-add',
  templateUrl: './posts-add.component.html',
  styleUrls: ['./posts-add.component.css'],
  providers: [FormBuilder, SidebarComponent, PostsComponent]
})
export class PostsAddComponent implements OnInit {

  postForm: FormGroup;
  authId:String;
  title:String='';
  content:String='';
  submitted = false;

  constructor(private router: Router, private apiService: ApiService, private formBuilder: FormBuilder, public sideBar: SidebarComponent, public postComponent: PostsComponent) { }


  /*
  onFormSubmit(form: NgForm ) {
    this.isLoadingResult = true;

    this.apiService.addPosts(form).subscribe(res =>{
      this.router.navigate(['posts']);
    },
        error1 => {
          console.log("error", error1);
          this.isLoadingResult = false;
        });

  }
  */

  ngOnInit() {

    console.log("user posts", this.sideBar.user._id);
    /*
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });

     */
  }

  onFormSubmit(f: NgForm){
    console.log("user posts", this.sideBar.user._id);

    const arrPost: Object = [
      {authId: this.sideBar.user._id,
        title: f.value.title,
        content: f.value.content
      },
    ];

    console.log( JSON.parse( JSON.stringify(arrPost[0]) ) );

    this.apiService.addPosts( JSON.parse( JSON.stringify(arrPost[0]) ) ).subscribe(res =>{
        this.router.navigate(['dashboard']);
      },
      error1 => {
        console.log("error", error1);
       //  this.isLoadingResult = false;
      });





    // JSON.stringify(f.value))

  }


}
