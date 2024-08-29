import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userService from './userService'; // Import the UserService instance
import { config } from 'dotenv';
import { AuthenticationResponse } from '../interfaces/user';

config();

const userValidationMessage = 'Username or password is incorrect';
const JWT_SECRET_KEY= process.env.JWT_SECRET_KEY || 'default_secret';


// Define types for the function parameters


// Authentication function
async function authentication(username: string, password: string): Promise<AuthenticationResponse> {
  try {
    // Get user credentials from the database
    const cred = await userService.queryCall();
    const user = cred.find(u => u.username === username);
    
    if (!user) throw new Error(userValidationMessage);
    
    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error(userValidationMessage);
    
    // Create a JWT token that is valid for 10 seconds
    const token = jwt.sign({ sub: user.username }, JWT_SECRET_KEY, { expiresIn: '10s' });
    
    return {
      ...userService.omitPassword(user), // Omit the password from the user object
      token
    };
  } catch (err:any) {
    throw new Error(`Authentication : ${err.message}`);
  }
}

export default authentication;
