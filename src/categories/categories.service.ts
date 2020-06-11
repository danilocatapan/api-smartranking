import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interfaces';
import { CreateCategoryDto } from './dtos/create-category.dto';

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
}
