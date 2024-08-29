import { RequestHandler } from 'express';
import { expressjwt } from 'express-jwt';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// Load environment variables from .env file
const secret = process.env.JWT_SECRET_KEY || 'default_secret';

const jwtMiddleware = (): RequestHandler => {
    return expressjwt({
        secret,
        algorithms: ['HS256'],
    }).unless({
        path: [
            // Public routes that don't require authentication
            '/api/users/register',
            '/api/login',
        ],
    });
};

export default jwtMiddleware;
