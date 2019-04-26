import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Posts} from '../models/posts.model';

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

  constructor(private apiService: ApiService) {
  }

  /**
   * Call the function getPosts to get all showed posts
   */
  ngOnInit() {
    this.apiService.getPosts().subscribe( (postsData: Posts[]) => {
      console.log(postsData);
      this.listPosts = postsData;
    });

    this.apiService.getUser().subscribe()
  }

  /**
   * Get author name throught posts userId
   * @param userId
   */
  getAuthName(userId){
    console.log("userid ", userId);
    if( userId != "undefined" && userId != "" ) {
      this.apiService.getSingleAuthor(userId).subscribe( res =>{
        console.log(res.username);
            return res.username;
          }
      );
    }
  }

}
