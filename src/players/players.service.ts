import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { CreatePlayerDto } from './dtos/create-player.dto'
import { Player } from './interfaces/player.interface'
import * as faker from 'faker'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class PlayersService {
  constructor (@InjectModel('Player') private playerModel: Model<Player>) {}

  private readonly logger = new Logger(PlayersService.name)

  async save(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto

    const playerFound = await this.playerModel.findOne({ email }).exec()

    if (playerFound) {
      await this.update(createPlayerDto)
    }else {
      await this.create(createPlayerDto)
    }
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

  async delete(email: string): Promise<any> {
    const player = this.playerModel.deleteOne({ email }).exec()
  }

  private async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const player = new this.playerModel(createPlayerDto)
    return await player.save()
  }

  private async update(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const player = this.playerModel.findByIdAndUpdate(
      { email: createPlayerDto.email }, { $set: createPlayerDto }).exec()

    return player
  }
}
