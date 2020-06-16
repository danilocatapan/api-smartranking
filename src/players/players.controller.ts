import { Controller, Post, Body, Get, Delete, UsePipes, ValidationPipe, Param, Put, Res, HttpStatus } from '@nestjs/common'
import { CreatePlayerDto, UpdatePlayerDto } from './dtos'
import { PlayersService } from './players.service'
import { Player } from './interfaces/player.interface'
import { ParametersValidationPipe } from '../common/pipes/parameters-validation.pipe'

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  save(@Body() createPlayerDto: CreatePlayerDto, @Res() response) {
    this.playerService.save(createPlayerDto).then(message => {
      response.status(HttpStatus.CREATED).json(message)
    }).catch(() => {
      response.status(HttpStatus.FORBIDDEN).json({
        message: 'Error to create player!'
      })
    })
  }
  
  @Put('/:id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param('id', ParametersValidationPipe) id: string): Promise<void> {
    await this.playerService.update(id, updatePlayerDto)
  }

  @Get()
  async get(): Promise<Player[]> {
    return this.playerService.get()
  }
  
  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Player> {
    return this.playerService.getById(id)
  }

  @Delete('/:id')
  async delete(@Param('id', ParametersValidationPipe) id: string): Promise<Player> {
    return this.playerService.delete(id)
  }
}
