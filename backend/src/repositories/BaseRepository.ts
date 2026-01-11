import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';

/**
 * Base Repository Pattern
 * Implements generic CRUD operations for all models
 * Follows Single Responsibility and Open/Closed principles
 */
export interface IRepository<T extends Document> {
  findAll(filter?: FilterQuery<T>): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: UpdateQuery<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}

export class BaseRepository<T extends Document> implements IRepository<T> {
  constructor(protected model: Model<T>) {}

  /**
   * Find all documents with optional filter
   */
  async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
    try {
      return await this.model.find(filter).sort({ order: 1, createdAt: -1 }).exec();
    } catch (error) {
      throw new Error(`Error finding documents: ${error}`);
    }
  }

  /**
   * Find document by ID
   */
  async findById(id: string): Promise<T | null> {
    try {
      return await this.model.findById(id).exec();
    } catch (error) {
      throw new Error(`Error finding document by ID: ${error}`);
    }
  }

  /**
   * Create new document
   */
  async create(data: Partial<T>): Promise<T> {
    try {
      const document = new this.model(data);
      return await document.save();
    } catch (error) {
      throw new Error(`Error creating document: ${error}`);
    }
  }

  /**
   * Update document by ID
   */
  async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    try {
      return await this.model
        .findByIdAndUpdate(id, data, { new: true, runValidators: true })
        .exec();
    } catch (error) {
      throw new Error(`Error updating document: ${error}`);
    }
  }

  /**
   * Delete document by ID
   */
  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.model.findByIdAndDelete(id).exec();
      return result !== null;
    } catch (error) {
      throw new Error(`Error deleting document: ${error}`);
    }
  }

  /**
   * Find one document by filter
   */
  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    try {
      return await this.model.findOne(filter).exec();
    } catch (error) {
      throw new Error(`Error finding document: ${error}`);
    }
  }

  /**
   * Count documents
   */
  async count(filter: FilterQuery<T> = {}): Promise<number> {
    try {
      return await this.model.countDocuments(filter).exec();
    } catch (error) {
      throw new Error(`Error counting documents: ${error}`);
    }
  }
}
