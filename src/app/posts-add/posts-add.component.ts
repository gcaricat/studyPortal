import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {PostsComponent} from '../posts/posts.component';

@Component({
  selector: 'app-posts-add',
  templateUrl: './posts-add.component.html',
  styleUrls: ['./posts-add.component.css'],
  providers: [FormBuilder, SidebarComponent, PostsComponent]
})
export class PostsAddComponent implements OnInit {

  title: String = '';
  content: String = '';

  @Input() isButtonVisible: boolean;

  constructor(private router: Router, private apiService: ApiService, public sideBar: SidebarComponent, public postComponent: PostsComponent) { }

  ngOnInit() {
  }

  onFormSubmit(f: NgForm) {
    var error = 0;
    const arrError = [];
    if ( f.value.title === '' ) {
      error = 1;
      arrError.push('Title');
    }

    if ( f.value.content === '') {
      error = 1;
      arrError.push('Content');
    }

    if ( !error ) {
      const arrPost: object = [
        {"authId": this.sideBar.user._id, "title": f.value.title,"content": f.value.content}
      ];

      this.apiService.addPosts( JSON.parse( JSON.stringify(arrPost[0]) ) ).subscribe(res =>{
            this.postComponent.ngOnInit();

          },
          error1 => {
             console.log('errore', error1);

            if (error1.status === 201) {

              f.reset();
              this.sleep(4000);
              this.postComponent.ngOnInit();
              location.reload();
              this.postComponent.rerender;
            } else {
              console.log("critical error response post-add");
            }
          });
    } else {
      alert('Error insert a value into'+arrError.join(","))
    }
  }


  sleep(milliseconds) {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
}
