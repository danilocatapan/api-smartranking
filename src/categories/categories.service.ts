import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interfaces';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos';

@Injectable()
export class CategoriesService {
  constructor (@InjectModel('Category') private readonly categoryModel: Model<Category>) {}

  async save(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { category } = createCategoryDto
    const foundCategory = await this.categoryModel.findOne({ category }).exec()
    if (foundCategory) {
      throw new BadRequestException(`Category ${category} already registered`)
    }
    const newCategory = new this.categoryModel(createCategoryDto)
    return await newCategory.save()
  }

  async get(): Promise<Category[]> {
    return await this.categoryModel.find().exec()
  }

  async getByCategory(category: string): Promise<Category> {
    const foundCategory = await this.categoryModel.findOne({ category }).exec()
    if (!foundCategory) {
      throw new NotFoundException(`Category ${category} not found`)
    }
    return foundCategory
  }

  async update(category: string, updateCategoryDto: UpdateCategoryDto): Promise<void> {
    const foundCategory = await this.categoryModel.findOne({ category }).exec()
    if (!foundCategory) {
      throw new NotFoundException(`Category ${category} not found`)
    }
    
    this.categoryModel.findOneAndUpdate({ category }, { $set: updateCategoryDto }).exec()
  }
}
