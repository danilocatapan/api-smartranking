import { Challenge } from './interface'
import { CreateChallengeDto } from './dtos/create-challenge.dto'
import { ChallengeStatus } from './enums/challenge-status.enum'
import { PlayersService } from 'src/players'
import { CategoriesService } from 'src/categories'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable, BadRequestException } from '@nestjs/common'
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

    const category = await this.categoriesService.getByIdPlayer(createChallengeDto.challenger)

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
}
