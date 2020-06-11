import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common'
import { CreatePlayerDto } from './dtos/create-player.dto'
import { Player } from './interfaces/player.interface'
import * as faker from 'faker'
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
  }

  private async update(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const player = this.playerModel.findByIdAndUpdate(
      { email: createPlayerDto.email }, { $set: createPlayerDto }).exec()

    return player
  }
}
