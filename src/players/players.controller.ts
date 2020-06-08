import { Controller, Post, Body } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto'
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {

  constructor(private readonly playerService: PlayersService) {}

  @Post()
  async save(@Body() createPlayerDto: CreatePlayerDto) {
    await this.playerService.save(createPlayerDto)
  }
}
