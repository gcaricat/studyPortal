import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {CommentsComponent} from '../comments/comments.component';

@Component({
  selector: 'app-comments-add',
  templateUrl: './comments-add.component.html',
  styleUrls: ['./comments-add.component.css'],
  providers: [FormBuilder, SidebarComponent, CommentsComponent],
})
export class CommentsAddComponent implements OnInit {

  content: String = '';

  /**
   * Get the idPost from the component post component throught the decorator
   * input that responsible for communication between two components.
   */
  @Input() idPost: string;

  constructor(private router: Router, private apiService: ApiService, private formBuilder: FormBuilder, public sideBar: SidebarComponent, public commentComponent: CommentsComponent) { }

  ngOnInit() {
  }

  /**
   * check if the form is empty and send via api the comment to the server
   * @param f
   */
  onFormSubmit(f: NgForm) {

    var error = 0;
    if (f.value.content == '') {
      alert("The commment field is empty. Insert a comment!");
      error = 1;
    }

    if ( !error ) {
      const arrComment: object = [
        {"authId": this.sideBar.user._id, "postId": this.idPost, "content": f.value.content}
      ];

      this.apiService.addComments(JSON.parse(JSON.stringify(arrComment[0]))).subscribe(res => {
            this.commentComponent.ngOnInit();
          },
          error1 => {
            console.log('errore into add comment', error1);

            if (error1.status === 201) {

              f.reset();
              this.sleep(4000);
              this.commentComponent.ngOnInit();
              location.reload();
              this.commentComponent.rerender;
            } else {
              console.log("critical error response post-add");
            }

          });
    }
  }

  /**
   * used for delaying the computation
   * @param milliseconds
   */
  sleep(milliseconds) {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  /**
   * Get usernamen of logged user
   */
  getUserName(){
    return this.sideBar.user.getUsername();
  }

}
