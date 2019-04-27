/**
 * Posts class used to save the posts sended via api
 */
export class Posts {
    public _id;
    public publish;
    public priority;
    public authId;
    public authName;
    public content;
    public title;
    public date

    constructor(id, publish, priority, authId, authName, content, title, date) {
        this._id = id;
        this.publish = publish;
        this.priority = priority;
        this.authId = authId;
        this.authName = authName;
        this.content = content;
        this.title = title;
        this.date = date;
    }
}


