import {Component, NgModule, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Posts} from '../models/posts.model';
import {EmbedVideo, EmbedVideoService} from "ngx-embed-video/dist";

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
  public embedService = null;

  constructor(
    private apiService: ApiService,
    private embedService: EmbedVideoService
  ) {
    this.embedService = embedService;
  }

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
        let videoEmbed = null;

        if(item.video !== null &&  typeof item.video != "undefined" && this.validURL(item.video)){
          videoEmbed = this.embedService.embed(item.video,{
            query: { portrait: 0, color: '333' },
            attr: { width: 600, height: 300 }
          });
        }

        if ( item.authId ) {

          this.apiService.getSingleAuthor(item.authId).subscribe( res => {
            this.authName = res.username;
            const singlePost = new Posts(
              item._id,
              item.publish,
              item.priority,
              item.authId,
              this.authName,
              item.content,
              item.title,
              sendDate,
              videoEmbed,
              item.Image
            );
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

  validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }


}
