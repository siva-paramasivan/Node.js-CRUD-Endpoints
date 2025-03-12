import { Request, Response, NextFunction,Router } from 'express';
import userService from '../services/userService';
import { Customer, User } from '../interfaces/user';
import CustomerModel from '../models/customer-model';

// Create a router instance
const router = Router(); // Import the userService

// router.get('/', getAllUsers);
router.post('/register', createUser);
router.get('/customers', getAllCustomers);
router.post('/customer', createCustomer);
router.put('/saveCustomer', saveCustomer);
router.delete('/deleteCustomer/:id', deleteCustomer);




// Route handler for registering a new user


// Route handler for getting all users
async function getAllCustomers (req: Request, res: Response, next: NextFunction){
  try {
    const users = await userService.getAllCustomers();
    res.status(200).json(users);
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};


async function createCustomer(req: Request, res: Response, next: NextFunction){
  const customerDetails: CustomerModel = req.body;
  const customer = await userService.createCustomer(customerDetails);
  res.status(201).json(customer);
}

async function saveCustomer(req: Request, res: Response, next: NextFunction){
  try{
    const customerDetails: CustomerModel = req.body;
    const customer = await userService.saveCustomer(customerDetails);
    res.status(200).json(customer);
  }catch(error){
    next(error)
  }
 
}

async function deleteCustomer(req: Request, res: Response, next: NextFunction){
  const customer = await userService.deleteCustomer(req.params.id);
  res.status(200).json(customer);
}

// async function getAllUsers (req: Request, res: Response, next: NextFunction){
//   try {
//     const users = await userService.getAllUsers();
//     res.status(200).json(users);
//   } catch (error) {
//     next(error); // Pass the error to the global error handler
//   }
// };



async function createUser(req: Request, res: Response, next: NextFunction){
  try{
    const customerDetails: User = req.body;
    const customer = await userService.createUser(customerDetails);
    res.status(201).json(customer);
  }catch(error){
    throw new Error(`Failed to create user ${error}`); 
  }
 
}

export default router;
