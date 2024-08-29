import express from 'express';
import router from './routes';
import jwtMiddleware from './helper/jwt';
import errorHandler from './helper/error-handler';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Apply JWT middleware
app.use(jwtMiddleware());

// Use the routes
app.use(router);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

