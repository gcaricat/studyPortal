/**
 * User class
 */
import {first} from "rxjs/operators";

export class User {
  public _id;
  public email;
  public password;
  public token;
  public role;
  public status;
  public registerDate;
  public firstName;
  public lastName;
  public dateOfBirth;
  public profilImage;


  /**
   * Initialize username and password
   */
  constructor() {
    this.email = '';
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
   * Set email
   * @param email
   */
  setEmail(email) {this.email = email; }

  getUserId(){return this._id;}

  /**
   * Get username
   */
  getEmail() { return this.email; }

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

  getFirstName(){
    return this.firstName;
  }

  setFirstName(firstName){
    this.firstName = firstName;
  }

  getLastName(){
    return this.lastName;
  }

  setLastName(lastName){
    this.lastName = lastName;
  }

  getDateOfBirth(){
    return this.dateOfBirth;
  }

  setDateOfBirth(dateOfBirth){
   this.dateOfBirth = dateOfBirth;
  }

  getImageProfile(){
    return this.profilImage;
  }

  setImageProfile(profileImage){
    this.profilImage = profileImage;
  }

  getUsername(){
    return this.email;
  }

  setUsername(email){
    this.email = email;
  }

}




