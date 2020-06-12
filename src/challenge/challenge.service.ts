import { Challenge } from './interface'
import { CreateChallengeDto, UpdateChallengeDto } from './dtos'
import { ChallengeStatus } from './enums/challenge-status.enum'
import { PlayersService } from 'src/players'
import { CategoriesService } from 'src/categories'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { Model } from 'mongoose'

@Injectable()
export class ChallengeService {
  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
    private readonly playersService: PlayersService,
    private readonly categoriesService: CategoriesService
  ) {}

  async save(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
    const players = await this.playersService.get()
    createChallengeDto.players.map(playerDto => {
      const filter = players.filter(player => player._id == playerDto._id)
      if (filter.length === 0) {
        throw new BadRequestException(`O id ${playerDto._id} is not a player`)
      }
    })

    const challenger = await createChallengeDto.players.filter(player => player._id == createChallengeDto.challenger)

    if (challenger.length == 0) {
      throw new BadRequestException(`The challenger must be a match player`)
    }

    const category = await this.categoriesService.getByPlayerId(createChallengeDto.challenger)

    if (!category) {
      throw new BadRequestException(`The challenger must be registered in a category`)
    }

    const challenge = new this.challengeModel(createChallengeDto)
    challenge.category = category.category
    challenge.dateHoraRequest = new Date()

    challenge.status = ChallengeStatus.PENDING
    return await challenge.save()
  }

  async get(): Promise<Challenge[]> {
    return await this.challengeModel.find()
      .populate('challenger')
      .populate('players')
      .populate('match')
      .exec()
  }

  async getByPlayerId(id: string): Promise<Challenge[]> {
    await this.playersService.getById(id)
    return await this.challengeModel.find()
      .where('players')
      .in([id])
      .populate('challenger')
      .populate('players')
      .populate('match')
      .exec()
  }

  async update(id: string, updateChallengeDto: UpdateChallengeDto): Promise<void> {
    const challenge = await this.challengeModel.findById(id).exec()
    if (!challenge) {
      throw new NotFoundException(`Challenge ${id} not found`)
    }
    if (updateChallengeDto.status) {
      challenge.DateHoraResponse = new Date()
    }
    challenge.status = updateChallengeDto.status
    challenge.dateHourChallenge = updateChallengeDto.dateHourChallenge
    await this.challengeModel.findByIdAndUpdate({ _id: id }, { $set: challenge }).exec()
  }
}
