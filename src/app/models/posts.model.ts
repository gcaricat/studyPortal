/**
 * Posts class used to save the posts sended via api
 */
import {User} from "./user.model";

export class Posts {
    public _id;
    private _publish;
    private _priority;
    private _authId;
    // public authName;
    // public authName;
    // public authSurname;
    // public authEmail;
    // public authImageProfile;
    // public authRole;
    // public authNameSurname;
    private _author: User;
    private _content;
    private _title;
    private _date;
    private _video;
    private _image;

    constructor(id, publish, priority, authId, author, content, title, date, video, Image) {
        this._id = id;
        this._publish = publish;
        this._priority = priority;
        this._authId = authId;
        this._author = author;
        this._content = content;
        this._title = title;
        this._date = date;
        this._video = video;
        this._image = Image;
    }


  get id() {
    return this._id;
  }

  get publish() {
    return this._publish;
  }

  set publish(value) {
    this._publish = value;
  }

  get priority() {
    return this._priority;
  }

  set priority(value) {
    this._priority = value;
  }

  get authId() {
    return this._authId;
  }

  set authId(value) {
    this._authId = value;
  }

  get author(): User {
    return this._author;
  }

  set author(value: User) {
    this._author = value;
  }

  get content() {
    return this._content;
  }

  set content(value) {
    this._content = value;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get date() {
    return this._date;
  }

  set date(value) {
    this._date = value;
  }

  get video() {
    return this._video;
  }

  set video(value) {
    this._video = value;
  }

  get image() {
    return this._image;
  }

  set image(value) {
    this._image = value;
  }
}


