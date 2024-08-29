import { Request, Response, NextFunction } from 'express';

// Define the error handler function with TypeScript types
function errorHandler(
    err: Error | string,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    if (typeof err === 'string') {
        // Custom application error
        res.status(400).json({ message: err });
        return;
    }

    if (err.name === 'UnauthorizedError') {
        // JWT authentication error
        res.status(401).json({ message: 'Invalid Token' });
        return;
    }

    // Default to 500 server error
    res.status(500).json({ message: err.message });
}

export default errorHandler;
