import { Request, Response, NextFunction,Router } from 'express';
import { ApplicationUsers } from '../models/application-model';
import authService from '../services/authService';

// Create a router instance
const router = Router();

// Define the route for authentication
router.post('/login', authenticate);
router.post('/applicationUser', register);


// Authentication handler function
async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { username, password } = req.body;
    const authResponse = await authService.authentication(username, password);
    res.status(200).json(authResponse);
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
}

async function register(req: Request, res: Response, next: NextFunction){
  try {
    await ApplicationUsers.create(req.body);
    res.status(201).json('User registered successfully');
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

// Export the router
export default router;
