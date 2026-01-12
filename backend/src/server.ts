import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';

// Configuration
import envConfig from './config/env';
import database from './config/database';

// Middlewares
import {
  createRateLimiter,
  helmetConfig,
  sanitizeData,
  sanitizeInput,
  preventParameterPollution,
  corsOptions,
  requestSizeLimit,
} from './middlewares/securityMiddleware';
import { errorHandler, AppError } from './middlewares/errorHandler';

// Routes
import authRoutes from './routes/authRoutes';
import experienceRoutes from './routes/experienceRoutes';
import projectRoutes from './routes/projectRoutes';
import educationRoutes from './routes/educationRoutes';
import skillRoutes from './routes/skillRoutes';
import profileRoutes from './routes/profileRoutes';

/**
 * Portfolio API Server
 * RESTful API with security best practices
 */
class Server {
  public app: Application;
  private config = envConfig.get();

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  /**
   * Initialize security and utility middlewares
   */
  private initializeMiddlewares(): void {
    // Security headers
    this.app.use(helmetConfig);

    // CORS configuration
    this.app.use(cors(corsOptions));

    // Rate limiting
    this.app.use('/api', createRateLimiter());

    // Body parser
    this.app.use(express.json({ limit: requestSizeLimit }));
    this.app.use(express.urlencoded({ extended: true, limit: requestSizeLimit }));

    // Data sanitization against NoSQL injection
    this.app.use(sanitizeData());

    // Input sanitization
    this.app.use(sanitizeInput);

    // Prevent parameter pollution
    this.app.use(preventParameterPollution);

    // Compression
    this.app.use(compression());

    // Logging
    if (envConfig.isDevelopment()) {
      this.app.use(morgan('dev'));
    } else {
      this.app.use(morgan('combined'));
    }
  }

  /**
   * Initialize API routes
   */
  private initializeRoutes(): void {
    // Health check endpoint
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({
        status: 'success',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
      });
    });

    // API routes
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/experience', experienceRoutes);
    this.app.use('/api/projects', projectRoutes);
    this.app.use('/api/education', educationRoutes);
    this.app.use('/api/skills', skillRoutes);
    this.app.use('/api/profile', profileRoutes);

    // 404 handler
    this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
      next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
    });
  }

  /**
   * Initialize error handling
   */
  private initializeErrorHandling(): void {
    this.app.use(errorHandler);
  }

  /**
   * Start server
   */
  public async start(): Promise<void> {
    try {
      // Connect to database
      await database.connect();

      // Start listening
      this.app.listen(this.config.port, () => {
        console.log('=================================');
        console.log(`🚀 Server running on port ${this.config.port}`);
        console.log(`📦 Environment: ${this.config.nodeEnv}`);
        console.log(`🔒 CORS enabled for: ${this.config.corsOrigin}`);
        console.log('=================================');
      });
    } catch (error) {
      console.error('❌ Failed to start server:', error);
      process.exit(1);
    }
  }

  /**
   * Graceful shutdown
   */
  public async shutdown(): Promise<void> {
    console.log('\n👋 Shutting down gracefully...');
    
    try {
      await database.disconnect();
      console.log('✅ Server shut down successfully');
      process.exit(0);
    } catch (error) {
      console.error('❌ Error during shutdown:', error);
      process.exit(1);
    }
  }
}

// Create and start server
const server = new Server();
server.start();

// Handle shutdown signals
process.on('SIGTERM', () => server.shutdown());
process.on('SIGINT', () => server.shutdown());

// Handle unhandled rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('💥 UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  server.shutdown();
});

export default server.app;
