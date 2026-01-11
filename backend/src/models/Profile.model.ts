import mongoose, { Schema, Document } from 'mongoose';

export interface IProfile extends Document {
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
  languages: Array<{
    name: string;
    proficiency: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date?: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Full name cannot exceed 100 characters'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    phone: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [500, 'Bio cannot exceed 500 characters'],
    },
    summary: {
      type: String,
      required: [true, 'Summary is required'],
      trim: true,
      maxlength: [2000, 'Summary cannot exceed 2000 characters'],
    },
    linkedinUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function(v: string) {
          if (!v) return true;
          return /^https?:\/\/(www\.)?linkedin\.com\/.+/.test(v);
        },
        message: 'Invalid LinkedIn URL',
      },
    },
    githubUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function(v: string) {
          if (!v) return true;
          return /^https?:\/\/(www\.)?github\.com\/.+/.test(v);
        },
        message: 'Invalid GitHub URL',
      },
    },
    profileImageUrl: {
      type: String,
      trim: true,
    },
    languages: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        proficiency: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    certifications: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        issuer: {
          type: String,
          required: true,
          trim: true,
        },
        date: {
          type: Date,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProfile>('Profile', ProfileSchema);
