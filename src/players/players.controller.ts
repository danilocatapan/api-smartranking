import { Controller, Post, Body, Get, Query, Delete, UsePipes, ValidationPipe, Param } from '@nestjs/common'
import { CreatePlayerDto } from './dtos/create-player.dto'
import { PlayersService } from './players.service'
import { Player } from './interfaces/player.interface'
import { PlayersParametersValidationPipe } from './pipes/player-parameters-validation.pipes'

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async save(@Body() createPlayerDto: CreatePlayerDto) {
    await this.playerService.save(createPlayerDto)
  }

  @Get()
  async get(): Promise<Player[]> {
    return this.playerService.get()
  }
  
  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Player> {
    return this.playerService.getById(id)
  }

  @Delete()
  async delete(@Query('email', PlayersParametersValidationPipe) email: string): Promise<Player> {
    return this.playerService.delete(email)
  }
}
