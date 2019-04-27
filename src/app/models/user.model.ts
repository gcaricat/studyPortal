/**
 * User class
 */
export class User {
  public _id;
  public username;
  public password;
  public token;
  public role;
  public status;
  public registerDate;

  /**
   * Initialize username and password
   */
  constructor() {
    this.username = '';
    this.password = '';
  }


  setId(id){
    this._id = id;
  }
  /**
   * Set token
   * @param token
   */
  setToken(token) {
    this.token = token;
  }

  /**
   * Set role
   * @param role
   */
  setRole(role) {
    this.role = role;
  }

  /**
   * Set status
   * @param status
   */
  setStatus(status) { this.status = status; }

  /**
   * Set registerDate
   * @param date
   */
  setDate(date) {this.registerDate = date; }

  /**
   * Set username
   * @param username
   */
  setUsername(username) {this.username = username; }

  getUserId(){return this._id;}

  /**
   * Get username
   */
  getUsername() { return this.username; }

  /**
   * Get Role
   */
  getRole() { return this.role; }

  /**
   * Get Status
   */
  getStatus() { return this.status; }

  /**
   * Get registerDate
   */
  getRegisterDate() { return this.registerDate; }
}

