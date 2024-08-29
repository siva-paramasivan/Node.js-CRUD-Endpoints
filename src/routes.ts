import { Router,Express } from 'express';
import authController from './controller/authController';
import userController from './controller/userController';

const router = Router();

  router.use('/api',authController),
  router.use('/api/users',userController)
  
  export default router;

