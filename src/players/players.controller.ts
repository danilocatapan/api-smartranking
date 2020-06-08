import { Controller, Post, Body, Get } from '@nestjs/common'
import { CreatePlayerDto } from './dtos/create-player.dto'
import { PlayersService } from './players.service'
import { Player } from './interfaces/player.interface'

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Post()
  async save(@Body() createPlayerDto: CreatePlayerDto) {
    await this.playerService.save(createPlayerDto)
  }

  @Get()
  async get(): Promise<Player[]> {
    return this.playerService.get()
  }
}
