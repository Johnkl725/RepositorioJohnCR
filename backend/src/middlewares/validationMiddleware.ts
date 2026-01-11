import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError } from './errorHandler';

/**
 * Validation Middleware using Joi
 * Prevents injection attacks and ensures data integrity
 */

/**
 * Generic validation middleware factory
 */
export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      return next(new AppError(errorMessage, 400));
    }

    // Replace request body with validated and sanitized data
    req.body = value;
    next();
  };
};

/**
 * MongoDB ID validation
 */
export const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  
  if (!objectIdRegex.test(id)) {
    return next(new AppError('Invalid ID format', 400));
  }
  
  next();
};

/**
 * Validation Schemas
 */

// Experience validation
export const experienceSchema = Joi.object({
  company: Joi.string().trim().max(100).required(),
  position: Joi.string().trim().max(100).required(),
  location: Joi.string().trim().max(100).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().min(Joi.ref('startDate')).allow(null),
  current: Joi.boolean(),
  description: Joi.string().trim().max(1000).required(),
  responsibilities: Joi.array().items(Joi.string().trim().max(500)).max(10),
  technologies: Joi.array().items(Joi.string().trim().max(50)).max(20),
  order: Joi.number().integer().min(0),
});

// Project validation
export const projectSchema = Joi.object({
  title: Joi.string().trim().max(150).required(),
  description: Joi.string().trim().max(500).required(),
  longDescription: Joi.string().trim().max(2000).allow(''),
  technologies: Joi.array().items(Joi.string().trim().max(50)).min(1).max(20).required(),
  category: Joi.string()
    .valid('Data Engineering', 'Data Analysis', 'Automation', 'Cloud', 'Full Stack', 'Other')
    .required(),
  date: Joi.date().required(),
  featured: Joi.boolean(),
  githubUrl: Joi.string().uri().pattern(/github\.com/).allow(''),
  liveUrl: Joi.string().uri().allow(''),
  imageUrl: Joi.string().uri().allow(''),
  highlights: Joi.array().items(Joi.string().trim().max(300)).max(10),
  order: Joi.number().integer().min(0),
});

// Education validation
export const educationSchema = Joi.object({
  institution: Joi.string().trim().max(200).required(),
  degree: Joi.string().trim().max(100).required(),
  field: Joi.string().trim().max(100).required(),
  location: Joi.string().trim().max(100).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().min(Joi.ref('startDate')).allow(null),
  current: Joi.boolean(),
  gpa: Joi.string().trim().max(20).allow(''),
  achievements: Joi.array().items(Joi.string().trim().max(300)).max(10),
  order: Joi.number().integer().min(0),
});

// Skill validation
export const skillSchema = Joi.object({
  name: Joi.string().trim().max(100).required(),
  category: Joi.string()
    .valid(
      'Lenguajes de Programación',
      'Bases de Datos',
      'Cloud & Big Data',
      'Herramientas',
      'BI & Visualización',
      'Otros'
    )
    .required(),
  proficiency: Joi.string().valid('Básico', 'Intermedio', 'Avanzado', 'Experto'),
  yearsOfExperience: Joi.number().integer().min(0).max(50),
  order: Joi.number().integer().min(0),
});

// Profile validation
export const profileSchema = Joi.object({
  fullName: Joi.string().trim().max(100).required(),
  title: Joi.string().trim().max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().trim().max(20).allow(''),
  location: Joi.string().trim().max(100).required(),
  bio: Joi.string().trim().max(500).allow(''),
  summary: Joi.string().trim().max(2000).required(),
  linkedinUrl: Joi.string().uri().pattern(/linkedin\.com/).allow(''),
  githubUrl: Joi.string().uri().pattern(/github\.com/).allow(''),
  profileImageUrl: Joi.string().uri().allow(''),
  languages: Joi.array().items(
    Joi.object({
      name: Joi.string().trim().required(),
      proficiency: Joi.string().trim().required(),
    })
  ),
  certifications: Joi.array().items(
    Joi.object({
      name: Joi.string().trim().required(),
      issuer: Joi.string().trim().required(),
      date: Joi.date().allow(null),
    })
  ),
});
