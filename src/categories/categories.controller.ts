import { Category } from './interfaces'
import { CreateCategoryDto, UpdateCategoryDto } from './dtos'
import { CategoriesService } from './categories.service'
import { Controller, Body, Post, UsePipes, ValidationPipe, Get, Param, Put } from '@nestjs/common'

@Controller('api/v1/categories')
export class CategoriesController {
  constructor (private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async save(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoriesService.save(createCategoryDto)
  }

  @Get()
  async get(): Promise<Category[]> {
    return await this.categoriesService.get()
  }

  @Get('/:category')
  async getByCategory(@Param('category') category: string): Promise<Category> {
    return await this.categoriesService.getByCategory(category)
  }

  @Put('/:category')
  @UsePipes(ValidationPipe)
  async update(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('category') category: string): Promise<void> {
      await this.categoriesService.update(category, updateCategoryDto)
  }

  @Post('/:category/players/:id')
  async addPlayer(@Param('category') category: string, @Param('id') idPlayer: string): Promise<void> {
    return await this.categoriesService.addPlayer(category, idPlayer)
  }
}
