import { Challenge } from './interface'
import { ChallengeService } from './challenge.service'
import { CreateChallengeDto, UpdateChallengeDto } from './dtos'
import { Controller, Post, UsePipes, ValidationPipe, Body, Get, Param, Put } from '@nestjs/common'
import { ChallengeStatusValidationPipe } from './pipes/challenge-status-validation.pipe'

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

  @Put('/:challenge')
  async update(
    @Body(ChallengeStatusValidationPipe) updateChallengeDto: UpdateChallengeDto,
    @Param('challenge') id: string): Promise<void> {
    await this.challengeService.update(id, updateChallengeDto)
  }
}
