import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Posts} from '../models/posts.model';
import {post} from "selenium-webdriver/http";
import {error} from "util";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  /**
   * Array that contain all posts
   */
  public listPosts: Posts[] = [];
  public authName;

  constructor(private apiService: ApiService) {


   // this.apiService.getUser().subscribe();
  }

  /**
   * Call the function getPosts to get all showed posts
   */
  ngOnInit() {
    /*
    this.apiService.getPosts().subscribe( (postsData: Posts[]) => {
      this.listPosts = postsData;
    });
    */
    this.apiService.getPosts().subscribe( (postsData: Posts[]) => {
      console.log(postsData);
      for(let item of postsData){

        if ( item.authId ) {

          this.apiService.getSingleAuthor(item.authId).subscribe( res =>{
            this.authName = res.username;
            const singlePost = new Posts(item.publish, item.priority, item.authId, this.authName, item.content, item.title);
            this.listPosts.push(singlePost);
          });
        }
      }
    });


  }

  /**
   * Get author name throught posts userId
   * @param userId
   */
  getAuthName(userId){

    if( userId != "undefined" && userId != "" ) {
      this.apiService.getSingleAuthor(userId).subscribe( res =>{
        res.username.toString();
            // return res.username.toString();
          }
      );
    }
  }

}
