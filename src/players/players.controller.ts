import { Controller, Post, Body } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto'

@Controller('api/v1/players')
export class PlayersController {

  @Post()
  async save(@Body() createPlayerDto: CreatePlayerDto) {
    const { name, email, cellphone } = createPlayerDto
    return JSON.stringify(`{
      "name": ${name},
      "email": ${email},
      "cellphone": ${cellphone},
    }`)
  }
}
