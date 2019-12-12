/**
 * Message class used for the crud operation via Api
 */
export class Message {
  public _id;
  public date;
  public status;
  public title;
  public receiverId;
  public authorId;
  public body;

  constructor(id, date, status, title, receiverId, authorId, body) {
    this._id = id;
    this.date = date;
    this.status = status;
    this.title = title;
    this.receiverId = receiverId;
    this.authorId = authorId;
    this.body = body;
  }
}
