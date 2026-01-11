import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import envConfig from '../config/env';

/**
 * Security Middleware Collection
 * Implements various security best practices
 */

/**
 * Rate Limiting - Prevents DDoS attacks
 */
export const createRateLimiter = () => {
  const config = envConfig.get();
  
  return rateLimit({
    windowMs: config.rateLimitWindowMs,
    max: config.rateLimitMaxRequests,
    message: 'Too many requests from this IP, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request, res: Response) => {
      res.status(429).json({
        status: 'error',
        message: 'Too many requests. Please try again later.',
      });
    },
  });
};

/**
 * Helmet - Security headers
 */
export const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
  crossOriginEmbedderPolicy: false,
});

/**
 * MongoDB Query Sanitization
 * Prevents NoSQL injection attacks
 */
export const sanitizeData = () => {
  return mongoSanitize({
    replaceWith: '_',
    onSanitize: ({ req, key }) => {
      console.warn(`Sanitized request data - Key: ${key}`);
    },
  });
};

/**
 * Input validation middleware
 * Sanitize and validate user inputs
 */
export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  // Remove any potential XSS scripts from request body
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === 'string') {
        // Remove potential XSS patterns
        req.body[key] = req.body[key]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .trim();
      }
    });
  }

  next();
};

/**
 * Prevent parameter pollution
 */
export const preventParameterPollution = (req: Request, res: Response, next: NextFunction) => {
  // Convert array query parameters to single values
  Object.keys(req.query).forEach((key) => {
    if (Array.isArray(req.query[key])) {
      req.query[key] = (req.query[key] as string[])[0];
    }
  });

  next();
};

/**
 * Request size limiter
 */
export const requestSizeLimit = '10mb';

/**
 * CORS configuration
 */
export const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    const allowedOrigins = envConfig.get().corsOrigin.split(',');
    
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
