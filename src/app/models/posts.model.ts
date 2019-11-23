/**
 * Posts class used to save the posts sended via api
 */
import {User} from "./user.model";

export class Posts {
    public _id;
    public publish;
    public priority;
    public authId;
    // public authName;
    // public authName;
    // public authSurname;
    // public authEmail;
    // public authImageProfile;
    // public authRole;
    // public authNameSurname;
    public author: User;
    public content;
    public title;
    public date;
    public video;
    public Image;

    constructor(id, publish, priority, authId, author, content, title, date, video, Image) {
        this._id = id;
        this.publish = publish;
        this.priority = priority;
        this.authId = authId;
        this.author = author;
        this.content = content;
        this.title = title;
        this.date = date;
        this.video = video;
        this.Image = Image;
    }
}


