import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: string;
  date: Date;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  highlights: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    longDescription: {
      type: String,
      trim: true,
      maxlength: [2000, 'Long description cannot exceed 2000 characters'],
    },
    technologies: {
      type: [String],
      required: [true, 'At least one technology is required'],
      validate: {
        validator: function(v: string[]) {
          return v.length > 0 && v.length <= 20;
        },
        message: 'Technologies must have between 1 and 20 items',
      },
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Data Engineering', 'Data Analysis', 'Automation', 'Cloud', 'Full Stack', 'Other'],
      default: 'Other',
    },
    date: {
      type: Date,
      required: [true, 'Project date is required'],
    },
    featured: {
      type: Boolean,
      default: false,
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
    liveUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function(v: string) {
          if (!v) return true;
          return /^https?:\/\/.+/.test(v);
        },
        message: 'Invalid URL',
      },
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    highlights: {
      type: [String],
      default: [],
      validate: {
        validator: function(v: string[]) {
          return v.length <= 10;
        },
        message: 'Cannot have more than 10 highlights',
      },
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ProjectSchema.index({ date: -1 });
ProjectSchema.index({ featured: 1 });
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ order: 1 });

export default mongoose.model<IProject>('Project', ProjectSchema);
