import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { Category } from './interfaces';
import { PlayersService } from 'src/players';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import * as mongoose from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor (
    @InjectModel('Category') private readonly categoryModel: mongoose.Model<Category>,
    private readonly playersServices: PlayersService) {}

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
    return await this.categoryModel.find().populate('players').exec()
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

  async addPlayer(category: string, idPlayer: any): Promise<void> {
    const foundCategory = await this.categoryModel.findOne({ category }).exec()
    if (!foundCategory) {
      throw new NotFoundException(`Category ${category} not found`)
    }

    if (!mongoose.Types.ObjectId.isValid(idPlayer)) {
      throw new BadRequestException(`Invalid id ${idPlayer}`)
    }

    const player = await this.categoryModel.find({ category }).where('players').in(idPlayer).exec()

    if (player.length > 0) {
      throw new BadRequestException(`Player already registered in category ${category}`)
    }

    await this.playersServices.getById(idPlayer)

    foundCategory.players.push(idPlayer)
    await this.categoryModel.findOneAndUpdate({ category }, { $set: foundCategory }).exec()
  }
}
