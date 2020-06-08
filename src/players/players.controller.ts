import { Controller, Post, Body, Get, Query, Delete } from '@nestjs/common'
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
  async get(@Query('email') email: string): Promise<Player[] | Player> {
    if (email) {
      return this.playerService.getByEmail(email)
    } else {
      return this.playerService.get()
    }
  }

  @Delete()
  async delete(@Query('email') email: string): Promise<Player> {
    return this.playerService.delete(email)
  }
}
