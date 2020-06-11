import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common'
import { CreatePlayerDto } from './dtos/create-player.dto'
import { Player } from './interfaces/player.interface'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UpdatePlayerDto } from './dtos'

@Injectable()
export class PlayersService {
  constructor (@InjectModel('Player') private playerModel: Model<Player>) {}

  private readonly logger = new Logger(PlayersService.name)

  async save(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { email } = createPlayerDto
    let player = await this.playerModel.findOne({ email }).exec()
    if (player) {
      throw new BadRequestException(`Player with email ${email} already registered`)
    }
    player = new this.playerModel(createPlayerDto)
    return await player.save()
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<void> {
    const player = await this.playerModel.findOne({ _id: id }).exec()
    if (!player) {
      throw new NotFoundException(`Player not found with id ${id}`)
    }
    
    this.playerModel.findOneAndUpdate({ _id: id }, { $set: updatePlayerDto }).exec()
  }

  async get(): Promise<Player[]> {
    return await this.playerModel.find().exec()
  }

  async getById(id: string): Promise<Player> {
    const playerFound = await this.playerModel.findOne({ _id: id }).exec()
    if (!playerFound) {
      throw new NotFoundException(`Player not found with id ${id}`)
    }
    return playerFound
  }

  async delete(id: string): Promise<any> {
    const playerFound = await this.playerModel.findOne({ _id: id }).exec()
    if (!playerFound) {
      throw new NotFoundException(`Player not found with id ${id}`)
    }
    const player = this.playerModel.deleteOne({ _id: id }).exec()
    return player
  }
}
