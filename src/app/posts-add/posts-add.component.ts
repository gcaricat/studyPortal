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
  video: webkitURL = null;
  selectedFile: File;

  private ImageBase64: String = '';

  @Input() isButtonVisible: boolean;

  constructor(private router: Router, private apiService: ApiService, public sideBar: SidebarComponent, public postComponent: PostsComponent) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    var files = event.target.files;
    var file = files[0];
    this.selectedFile = file;
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  onUpload() {
    // upload code goes here
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


    if(f.value.video != "" && this.validURL(f.value.video) === false){
      error = 1;
      arrError.push('Link error');
    }

    if ( !error ) {
      const arrPost: object = [
        {
          "authId": this.sideBar.user._id,
          "title": f.value.title,
          "content": f.value.content,
          "video": f.value.video,
          // "image": this.ImageBase64
          //"Image": this.selectedFile
          "Image": f.value.Image
        }
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

  validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.ImageBase64= btoa(binaryString);
    console.log(btoa(binaryString));
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
