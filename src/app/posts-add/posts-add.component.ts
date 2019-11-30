import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {PostsComponent} from '../posts/posts.component';
import {EmbedVideoService} from 'ngx-embed-video/dist';


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

  public showVideo: Boolean = false;
  public showImage: Boolean = false;
  private ImageBase64: String = '';
  public embedService;
  public video_preview = null;

  @Input() isButtonVisible: boolean;

  constructor(
    private router: Router,
    private apiService: ApiService,
    public sideBar: SidebarComponent,
    public postComponent: PostsComponent,
    embeddService: EmbedVideoService
  )
  {
    this.embedService = embeddService;
  }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.showImage = false;
    var files = event.target.files;
    var file = files[0];
    this.selectedFile = file;
    if (files && file) {
      this.showImage = true;
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  videoChange(video)
  {
    this.showVideo = false;
    this.video_preview = null;

    if (video !== null && typeof video !== 'undefined' && this.validURL(video) ) {
      this.showVideo = true;

      this.video_preview = this.embedService.embed(video,{
        query: { portrait: 0, color: '333' },
        attr: { width: 600, height: 300 }
      });

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

      if (this.ImageBase64 != '' && this.ImageBase64 != null) {
        this.ImageBase64 = 'data:image/jpg;base64,' + this.ImageBase64;
      }

      const arrPost: object = [
        {
          "authId": this.sideBar.user._id,
          "title": f.value.title,
          "content": f.value.content,
          "video": f.value.video,
          "image": this.ImageBase64
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
