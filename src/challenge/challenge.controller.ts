import { Challenge } from './interface'
import { ChallengeService } from './challenge.service'
import { CreateChallengeDto } from './dtos/create-challenge.dto'
import { Controller, Post, UsePipes, ValidationPipe, Body, Get, Param } from '@nestjs/common'

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

  @Get('/:id')
  async getByPlayerId(@Param('id') id: string): Promise<Challenge[]> {
    return await this.challengeService.getByPlayerId(id)
  }
}
