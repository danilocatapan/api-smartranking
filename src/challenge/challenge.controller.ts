import { Controller, Post, UsePipes, ValidationPipe, Body, Query, Get } from '@nestjs/common'
import { CreateChallengeDto } from './dtos/create-challenge.dto'
import { Challenge } from './interface'
import { ChallengeService } from './challenge.service'

@Controller('api/v1/challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async save(@Body() createChallengeDto: CreateChallengeDto): Promise<Challenge> {
    return await this.challengeService.save(createChallengeDto)
  }

  @Get()
  async get(): Promise<Challenge[]> {
    return await this.challengeService.get()
  }
}
