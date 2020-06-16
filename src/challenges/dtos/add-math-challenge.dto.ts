import { Result } from '../interface';
import { Player } from 'src/players/interfaces';
import { IsNotEmpty } from 'class-validator';

export class AddMathChallengeDto {
  @IsNotEmpty()
  winner: Player;

  @IsNotEmpty()
  result: Result[];
}
