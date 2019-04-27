import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Posts} from '../models/posts.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
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
      for(let item of postsData){

        const current_date = item.date;

        var date =  new Date(+(current_date.match(/\d+/)[0]));

        var formattedDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        var hours = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
        var minutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
        var formattedTime = hours + ":" + minutes;

        const sendDate = formattedDate+" "+formattedTime;


        //this.user.setDate(formattedDate+" "+formattedTime);

        if ( item.authId ) {

          this.apiService.getSingleAuthor(item.authId).subscribe( res =>{
            this.authName = res.username;
            const singlePost = new Posts(item.publish, item.priority, item.authId, this.authName, item.content, item.title, sendDate);
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
