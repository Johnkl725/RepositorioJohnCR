import { Request, Response, NextFunction } from 'express';

/**
 * Error Handler Middleware
 * Centralized error handling following Single Responsibility Principle
 */

export interface CustomError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

class ErrorHandler {
  /**
   * Development error response
   */
  private sendErrorDev(err: CustomError, res: Response): void {
    res.status(err.statusCode || 500).json({
      status: err.status || 'error',
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  /**
   * Production error response
   */
  private sendErrorProd(err: CustomError, res: Response): void {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
      res.status(err.statusCode || 500).json({
        status: err.status || 'error',
        message: err.message,
      });
    } else {
      // Programming or unknown error: don't leak details
      console.error('ERROR 💥', err);
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong',
      });
    }
  }

  /**
   * Handle Mongoose CastError (invalid ID)
   */
  private handleCastError(err: any): CustomError {
    const message = `Invalid ${err.path}: ${err.value}`;
    const error: CustomError = new Error(message);
    error.statusCode = 400;
    error.isOperational = true;
    return error;
  }

  /**
   * Handle Mongoose duplicate key error
   */
  private handleDuplicateKeyError(err: any): CustomError {
    const value = err.keyValue ? Object.values(err.keyValue)[0] : 'unknown';
    const message = `Duplicate field value: ${value}. Please use another value`;
    const error: CustomError = new Error(message);
    error.statusCode = 400;
    error.isOperational = true;
    return error;
  }

  /**
   * Handle Mongoose validation error
   */
  private handleValidationError(err: any): CustomError {
    const errors = Object.values(err.errors).map((e: any) => e.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    const error: CustomError = new Error(message);
    error.statusCode = 400;
    error.isOperational = true;
    return error;
  }

  /**
   * Main error handling middleware
   */
  public handle = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
      this.sendErrorDev(err, res);
    } else {
      let error = { ...err, message: err.message };

      // Handle specific Mongoose errors
      if (err.name === 'CastError') error = this.handleCastError(err);
      if ((err as any).code === 11000) error = this.handleDuplicateKeyError(err);
      if (err.name === 'ValidationError') error = this.handleValidationError(err);

      this.sendErrorProd(error, res);
    }
  };
}

export const errorHandler = new ErrorHandler().handle;

/**
 * Async error wrapper
 * Wraps async route handlers to catch errors
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Create operational error
 */
export class AppError extends Error implements CustomError {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
