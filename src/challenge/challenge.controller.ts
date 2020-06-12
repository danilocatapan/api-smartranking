import { Challenge } from './interface'
import { ChallengeService } from './challenge.service'
import { CreateChallengeDto, UpdateChallengeDto, AddMathChallengeDto } from './dtos'
import { ChallengeStatusValidationPipe } from './pipes/challenge-status-validation.pipe'
import { Controller, Post, UsePipes, ValidationPipe, Body, Get, Param, Put } from '@nestjs/common'

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

  @Put('/:id')
  async update(
    @Body(ChallengeStatusValidationPipe) updateChallengeDto: UpdateChallengeDto,
    @Param('id') id: string): Promise<void> {
    await this.challengeService.update(id, updateChallengeDto)
  }

  @Post('/:id/match')
  async addMath(
    @Body(ValidationPipe) addMathChallengeDto: AddMathChallengeDto,
    @Param('id') id: string): Promise<void> {
    await this.challengeService.addMath(id, addMathChallengeDto)
  }
}
