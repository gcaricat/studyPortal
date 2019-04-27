import {Component, OnInit} from '@angular/core';
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
  /**
   * Used to hidden the add post form
   */
  public isButtonVisible = false;

  rerender = false;

  constructor(private apiService: ApiService) {}

  /**
   * Call the function getPosts to get all showed posts
   */
  ngOnInit() {

    this.apiService.getPosts().subscribe( (postsData: Posts[]) => {
      // console.log(postsData);
      for (const item of postsData) {
        const currentDate = item.date;

        const date =  new Date(+(currentDate.match(/\d+/)[0]));

        const formattedDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        const hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
        const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
        const formattedTime = hours + ':' + minutes;

        const sendDate = formattedDate + ' ' + formattedTime;

        if ( item.authId ) {

          this.apiService.getSingleAuthor(item.authId).subscribe( res => {
            this.authName = res.username;
            const singlePost = new Posts(item._id,  item.publish, item.priority, item.authId, this.authName,
                                        item.content, item.title, sendDate);
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
  getAuthName(userId) {

    if ( userId !== 'undefined' && userId !== '' ) {
      this.apiService.getSingleAuthor(userId).subscribe( res => {
        res.username.toString();
            // return res.username.toString();
          }
      );
    }
  }

  checkBtnVisible() {
    return this.isButtonVisible = (!this.isButtonVisible);
  }


}
