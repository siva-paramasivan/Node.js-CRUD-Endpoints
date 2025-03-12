import { config as SqlConfig } from 'mssql';
import { config as dotenvConfig } from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Users } from '../models/user-model';
import { CustomerModel } from '../models/customer-model';
import ApplicationUsers from '../models/application-model';

// Load environment variables from .env file
dotenvConfig();

// Load environment variables from .env file
// Define the database connection configuration
// const dbConfig: SqlConfig = {
//   server: process.env.DB_SERVER ||'localhost',
//   user: process.env.DB_USER , // Optional: Use if SQL authentication is used
//   password: process.env.DB_PASSWORD, // Optional: Use if SQL authentication is used
//   driver: 'tedious', // Specify 'tedious' for SQL Server
//   options: {
//     encrypt: process.env.DB_ENCRYPT === 'true', // Convert string to boolean
//     trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true', // Convert string to boolean
//     trustedConnection:true,
//     database:process.env.DB_DATABASE
//   },
//   };

const sequelize = new Sequelize({
  dialect: 'mssql',
  host: 'ILDTRYLAP0157',       // Replace with your MSSQL host
  username: 'user1',          // Replace with your username
  password:  'testuser', // Replace with your password
  database: 'Global Billing',  // Replace with your database name
  dialectOptions: {
    options: {
      encrypt: false, // For secure connections
      enableArithAbort: true,
    },
  },
 models: [Users,CustomerModel,ApplicationUsers], // Path to your models
});


export default sequelize;

