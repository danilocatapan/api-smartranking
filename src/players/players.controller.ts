import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
} from '@nestjs/common';
import { CreatePlayerDto, UpdatePlayerDto } from './dtos';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';
import { ParametersValidationPipe } from '../common/pipes/parameters-validation.pipe';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async save(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    const player = await this.playerService.save(createPlayerDto);
    return player;
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param('id', ParametersValidationPipe) id: string,
  ): Promise<void> {
    await this.playerService.update(id, updatePlayerDto);
  }

  @Get()
  async get(): Promise<Player[]> {
    return this.playerService.get();
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Player> {
    return this.playerService.getById(id);
  }

  @Delete('/:id')
  async delete(
    @Param('id', ParametersValidationPipe) id: string,
  ): Promise<Player> {
    return this.playerService.delete(id);
  }
}
