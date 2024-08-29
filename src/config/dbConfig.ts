import sql, { config as SqlConfig } from 'mssql';
import { config as dotenvConfig } from 'dotenv';

// Load environment variables from .env file
dotenvConfig();

// Load environment variables from .env file
// Define the database connection configuration
const dbConfig: SqlConfig = {
  server: process.env.DB_SERVER ||'localhost',
  user: process.env.DB_USER , // Optional: Use if SQL authentication is used
  password: process.env.DB_PASSWORD, // Optional: Use if SQL authentication is used
  driver: 'tedious', // Specify 'tedious' for SQL Server
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true', // Convert string to boolean
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true', // Convert string to boolean
    trustedConnection:true,
    database:process.env.DB_DATABASE
  },
  };

export default dbConfig;
