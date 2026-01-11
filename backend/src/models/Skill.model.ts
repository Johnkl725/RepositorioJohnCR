import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: string;
  proficiency: 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto';
  yearsOfExperience?: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
      maxlength: [100, 'Skill name cannot exceed 100 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Lenguajes de Programación',
        'Bases de Datos',
        'Cloud & Big Data',
        'Herramientas',
        'BI & Visualización',
        'Otros',
      ],
      default: 'Otros',
    },
    proficiency: {
      type: String,
      enum: ['Básico', 'Intermedio', 'Avanzado', 'Experto'],
      default: 'Intermedio',
    },
    yearsOfExperience: {
      type: Number,
      min: 0,
      max: 50,
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
SkillSchema.index({ category: 1 });
SkillSchema.index({ order: 1 });

export default mongoose.model<ISkill>('Skill', SkillSchema);
