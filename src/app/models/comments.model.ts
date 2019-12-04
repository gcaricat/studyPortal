/**
 * Comment class used for the crud operation via Api
 */
export class Comments {
    public _id;
    public authId;
    public authName;
    public postId;
    public content;
    public title;
    public publishDate;

    constructor(id, authId, authName, postId, content, publishDate) {
        this._id = id;
        this.authId = authId;
        this.authName = authName;
        this.postId = postId;
        this.content = content;
        this.publishDate = publishDate;
    }
}
