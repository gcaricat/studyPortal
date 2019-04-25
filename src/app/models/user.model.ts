
export class User {
  public username;
  public password;
  public token;
  public role;
  public status;
  public registerDate;

  constructor() {
    this.username = '';
    this.password = '';
  }

  setToken(token) {
    this.token = token;
  }
  setRole(role) {
    this.role = role;
  }

  setStatus(status) { this.status = status; }
  setDate(date) {this.registerDate = date; }
  setUsername(username) {this.username = username; }

  getUsername() { return this.username; }
  getRole() { return this.role; }
  getStatus() { return this.status; }
  getRegisterDate() { return this.registerDate; }
}

