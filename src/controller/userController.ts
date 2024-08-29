import { Request, Response, NextFunction,Router } from 'express';
import userService from '../services/userService';

// Create a router instance
const router = Router(); // Import the userService

router.get('/', getAllUsers);
router.post('/register', register);

// Route handler for registering a new user
async function register(req: Request, res: Response, next: NextFunction){
  try {
    const { firstname, lastname, username, password } = req.body;
    await userService.register({ firstname, lastname, username, password });
    res.status(201).json('User registered successfully');
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

// Route handler for getting all users
async function getAllUsers (req: Request, res: Response, next: NextFunction){
  try {
    const users = await userService.getAllUsersList();
    res.status(200).json(users);
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

export default router;
