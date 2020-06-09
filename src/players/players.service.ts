import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { CreatePlayerDto } from './dtos/create-player.dto'
import { Player } from './interfaces/player.interface'
import * as faker from 'faker'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class PlayersService {

  private players: Player[] = []

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
    return await this.players
  }

  async getByEmail(email: string): Promise<Player> {
    const playerFound = await this.players.find(player => player.email === email)
    if (!playerFound) {
      throw new NotFoundException(`Player not found with email ${email}`)
    }
    return playerFound
  }

  async delete(email: string): Promise<Player> {
    const playerFound = await this.players.find(player => player.email === email)
    if (!playerFound) {
      throw new NotFoundException(`Player not found with email ${email}`)
    }
    this.players = this.players.filter(player => player.email !== playerFound.email)
    return playerFound
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
