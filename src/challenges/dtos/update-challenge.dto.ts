import { ChallengeStatus } from '../enums/challenge-status.enum';
import { IsDateString, IsOptional } from 'class-validator';

export class UpdateChallengeDto {
  @IsOptional()
  @IsDateString()
  dateHourChallenge: Date;

  @IsOptional()
  status: ChallengeStatus;
}
