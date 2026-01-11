import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Environment Configuration
 * Centralizes all environment variables with type safety
 */
interface EnvConfig {
  port: number;
  nodeEnv: string;
  mongoUri: string;
  corsOrigin: string;
  rateLimitWindowMs: number;
  rateLimitMaxRequests: number;
}

class EnvironmentConfig {
  private static instance: EnvironmentConfig;
  private config: EnvConfig;

  private constructor() {
    this.config = this.loadConfig();
    this.validateConfig();
  }

  public static getInstance(): EnvironmentConfig {
    if (!EnvironmentConfig.instance) {
      EnvironmentConfig.instance = new EnvironmentConfig();
    }
    return EnvironmentConfig.instance;
  }

  private loadConfig(): EnvConfig {
    return {
      port: parseInt(process.env.PORT || '5000', 10),
      nodeEnv: process.env.NODE_ENV || 'development',
      mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio',
      corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
      rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
    };
  }

  private validateConfig(): void {
    const required = ['mongoUri'];
    const missing = required.filter(key => !this.config[key as keyof EnvConfig]);

    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  }

  public get(): EnvConfig {
    return { ...this.config };
  }

  public isDevelopment(): boolean {
    return this.config.nodeEnv === 'development';
  }

  public isProduction(): boolean {
    return this.config.nodeEnv === 'production';
  }
}

export default EnvironmentConfig.getInstance();
