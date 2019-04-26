/**
 * Posts class used to save the posts sended via api
 */
export class Posts {
    public publish;
    public priority;
    public authId;
    public authName;
    public content;
    public title;

    constructor(publish, priority, authId, authName, content, title) {
        this.publish = publish;
        this.priority = priority;
        this.authId = authId;
        this.authName = authName;
        this.content = content;
        this.title = title;
    }
}


