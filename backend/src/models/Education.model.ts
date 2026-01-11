import mongoose, { Schema, Document } from 'mongoose';

export interface IEducation extends Document {
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  gpa?: string;
  achievements: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const EducationSchema = new Schema<IEducation>(
  {
    institution: {
      type: String,
      required: [true, 'Institution name is required'],
      trim: true,
      maxlength: [200, 'Institution name cannot exceed 200 characters'],
    },
    degree: {
      type: String,
      required: [true, 'Degree is required'],
      trim: true,
      maxlength: [100, 'Degree cannot exceed 100 characters'],
    },
    field: {
      type: String,
      required: [true, 'Field of study is required'],
      trim: true,
      maxlength: [100, 'Field cannot exceed 100 characters'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      maxlength: [100, 'Location cannot exceed 100 characters'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      default: null,
    },
    current: {
      type: Boolean,
      default: false,
    },
    gpa: {
      type: String,
      trim: true,
    },
    achievements: {
      type: [String],
      default: [],
      validate: {
        validator: function(v: string[]) {
          return v.length <= 10;
        },
        message: 'Cannot have more than 10 achievements',
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
EducationSchema.index({ startDate: -1 });
EducationSchema.index({ order: 1 });

export default mongoose.model<IEducation>('Education', EducationSchema);
