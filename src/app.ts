import express from 'express';
import router from './routes';
import jwtMiddleware from './helper/jwt';
import errorHandler from './helper/error-handler';
import sequelize from './config/dbConfig';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    await sequelize.sync({ force: false }); // Set force: true to drop and recreate tables
    console.log('Models synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

//Apply JWT middleware
app.use(jwtMiddleware());

// Use the routes
app.use(router);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

