import { Category } from './interfaces'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dtos/create-category.dto'
import { Controller, Body, Post, UsePipes, ValidationPipe } from '@nestjs/common'

@Controller('api/v1/categories')
export class CategoriesController {
  constructor (private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async save(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoriesService.save(createCategoryDto)
  }
}
