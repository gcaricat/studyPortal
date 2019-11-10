import {Component, Input, OnInit} from '@angular/core';
import {Comments} from '../models/comments.model';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  /**
   * Get the idPost from the component post component throught the decorator
   * input that responsible for communication between two components.
   */
  @Input() idPost: string;
  /**
   * Array that contain all comments of specific post
   */
  public listComments: Comments[] = [];
  /**
   * Author name of specific post
   */
  public authName;

  rerender = false;

  constructor(private apiService: ApiService) { }

  /**
   * inizialization
   * Call the function getComments to get all showed comments after are parsing the PostComment array of type Comments
   */
  ngOnInit() {

    this.apiService.getCommentsFromPost(this.idPost).subscribe( (postsComment: Comments[]) => {

      for (const item of postsComment) {
        const currentDate = item.publishDate;

        const date =  new Date(+(currentDate.match(/\d+/)[0]));

        const formattedDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        const hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
        const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
        const formattedTime = hours + ':' + minutes;

        const sendDate = formattedDate + ' ' + formattedTime;

        if ( item.authId ) {
          this.apiService.getSingleAuthor(item.authId).subscribe( res => {
            this.authName = res.email;
            const singleComment = new Comments(item._id, item.authId, this.authName, this.idPost, item.content, sendDate);
            this.listComments.push(singleComment);
          });
        }
      }
    });
  }
}
