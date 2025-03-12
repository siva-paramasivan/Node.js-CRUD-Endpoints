import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userService from './userService'; // Import the UserService instance
import { config } from 'dotenv';
import { AuthenticationResponse, User } from '../interfaces/user';
import Users from '../models/user-model';
import { ApplicationUsers } from '../models/application-model';

config();

const userValidationMessage = 'Username or password is incorrect';
const JWT_SECRET_KEY= process.env.JWT_SECRET_KEY || 'default_secret';



// Authentication function
async function authentication(username: string, password: string): Promise<AuthenticationResponse> {
  try {
    // Get user credentials from the database
    const cred = await getAllApplicationUsers();

    const users = cred.find(user => user.name === username && user.password === password);
    
    if (!users) throw new Error(userValidationMessage);
  
    // Create a JWT token that is valid for 10 seconds
    const token = jwt.sign({ username: users.name , role: users.role||'user' }, JWT_SECRET_KEY, { expiresIn: '50s' });
    
    return {
      username:users.name, // Omit the password from the user object
      token,
    };
  } catch (err:any) {
    throw new Error(`Authentication : ${err.message}`);
  }
}

const getAllApplicationUsers = async()=>{
    return ApplicationUsers.findAll().then(res=> res).catch(err => {throw new Error("Not record found")})
}

export default {authentication};
