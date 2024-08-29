import { ConnectionPool, config } from 'mssql';
import sql from 'mssql'
import bcrypt from 'bcrypt';
import dbConfig from '../config/dbConfig';
import { User } from '../interfaces/user';
// Define the User interface


// Define the UserWithoutPassword interface
export interface UserWithoutPassword extends Omit<User, 'password'> {}

// Create a connection pool instance
class Database {
  private pool: ConnectionPool | null = null;

  async connect(): Promise<void> {
    if (!this.pool) {
      this.pool = await sql.connect(dbConfig);
    }
  }

  getPool(): ConnectionPool {
    if (!this.pool) {
      throw new Error('Database not connected');
    }
    return this.pool;
  }

  async close(): Promise<void> {
    if (this.pool) {
      await this.pool.close();
      this.pool = null;
    }
  }
}

const database = new Database();

// Get users list from Users Table Database
async function queryCall(): Promise<User[]> {
  await database.connect();
  try {
    const result = await database.getPool().request().query('SELECT * FROM users');
    return result.recordset as User[];
  } catch (err:any) {
    throw new Error(`Database query failed: ${err.message}`);
  } finally {
    await database.close();
  }
}

// Return all users list without passwords
export async function getAllUsersList(): Promise<UserWithoutPassword[]> {
  const userData = await queryCall();
  return userData.map(u => omitPassword(u));
}

// Register a new user
export async function register(user: User): Promise<void> {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  await database.connect();
  try {
    const query = 'INSERT INTO users (firstname, lastname, username, password) VALUES (@firstname, @lastname, @username, @password)';
    await database.getPool().request()
      .input('firstname', sql.VarChar, user.firstname)
      .input('lastname', sql.VarChar, user.lastname)
      .input('username', sql.VarChar, user.username)
      .input('password', sql.VarChar, hashedPassword)
      .query(query);
  } catch (err:any) {
    throw new Error(`Database insertion failed: ${err.message}`);
  } finally {
    await database.close();
  }
}

// Helper function to omit the password from the user object
function omitPassword(user: User): UserWithoutPassword {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export default {
  queryCall,
  getAllUsersList,
  register,
  omitPassword
};
