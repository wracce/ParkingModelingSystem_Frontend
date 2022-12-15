export class JwtResponse {

  token: string;
  username: string;
  userRole: string;

  constructor(token: string, username: string, userType: string) {
    this.token = token;
    this.username = username;
    this.userRole = userType;
  }
}
