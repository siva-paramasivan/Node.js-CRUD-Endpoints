export interface User {
    id?: string; // Assuming there's an ID field; adjust as necessary
    firstname: string;
    lastname: string;
    username: string;
    password: string; // Raw password before hashing
  }

export interface AuthenticationResponse {
    username: string;
    token: string;
  }

export interface Customer{
  id:string;
  name:string;
  address:string;
  emailAddress:string;
  contactInformation:number;
  createdBy:'sivaprakash';
}