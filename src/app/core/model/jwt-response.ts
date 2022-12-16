export class JwtResponse {

  id: number;
  fio: string;
  token: string;
  username: string;
  userRole: string;

  constructor(id: number, fio: string, token: string, username: string, userType: string) {
    this.id = id;
    this.fio = fio;
    this.token = token;
    this.username = username;
    this.userRole = userType;
  }
}
