/**
 * TypeScript Type Definitions
 * Ensures type safety across the application
 */

export interface Profile {
  _id: string;
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  summary: string;
  linkedinUrl?: string;
  githubUrl?: string;
  profileImageUrl?: string;
  languages: Language[];
  certifications: Certification[];
  createdAt: string;
  updatedAt: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
}

export interface Experience {
  _id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: string;
  date: string;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  highlights: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  achievements: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto';
  yearsOfExperience?: number;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface SkillsGrouped {
  [category: string]: Skill[];
}

export interface ApiResponse<T> {
  status: 'success' | 'fail' | 'error';
  data?: T;
  results?: number;
  message?: string;
}
