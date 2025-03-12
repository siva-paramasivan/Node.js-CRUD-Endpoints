import { ConnectionPool, config } from 'mssql';
import sql from 'mssql'
import bcrypt from 'bcrypt';
import dbConfig from '../config/dbConfig';
import { Customer, User } from '../interfaces/user';
import { CustomerModel } from '../models/customer-model';
import { Users } from '../models/user-model';

// Define the User interface


// Define the UserWithoutPassword interface
export interface UserWithoutPassword extends Omit<User, 'password'> {}

const getAllCustomers = async() => {
  return CustomerModel.findAll().then(res => 
    { const result = res.map(x => x.dataValues).sort((a,b)=>a.createdAt<b.createdAt?-1:1)
      return result;
    }
   )
  .catch((error:any)=>{
    throw new Error(`Get All Customer Failed: ${error.message}`);})
};

// Function to create a user with error handling
const createCustomer = async (customerDetails:CustomerModel) => {
    return CustomerModel.create(customerDetails)
    .then(res=> res)
    .catch (error=> {
    console.error('Error creating user:', error);
    throw new Error(`Failed to create user ${error}`);  // Custom error
  })
  .finally();
};


const saveCustomer = (customerDetails:CustomerModel) => {
   return CustomerModel.update(customerDetails,{ where: { id: customerDetails.id } })
    .then(res => res)
    .catch((error:any)=>{
      throw new Error(`Update Failed: ${error.message}`);})
};

const deleteCustomer = async (UUID:string) => {
  return CustomerModel.destroy({where:{id:UUID}}).then(res=> res)
  .catch(error =>{console.error('Error creating user:', error);
    throw new Error(`Failed to create user ${error}`);
  })
};

const createUser = async (customerDetails:User) => {
    return Users.create(customerDetails)
    .then(res=> res)
    .catch ( error => {
    console.error('Error creating user:', error);
    throw new Error(`Failed to create user ${error}`);  // Custom error
  })
};

// Helper function to omit the password from the user object
function omitPassword(user: any): UserWithoutPassword {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export default {
  getAllCustomers,
  createCustomer,
  createUser,
  omitPassword,
  deleteCustomer,
  saveCustomer
};
