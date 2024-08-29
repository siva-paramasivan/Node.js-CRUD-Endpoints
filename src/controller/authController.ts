import { Request, Response, NextFunction,Router } from 'express';
import authentication from '../services/authService';

// Create a router instance
const router = Router();

// Define the route for authentication
router.post('/login', authenticate);

// Authentication handler function
async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { username, password } = req.body;
    const authResponse = await authentication(username, password);
    res.status(200).json(authResponse);
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
}

// Export the router
export default router;
