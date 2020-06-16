import { ChallengeStatus } from '../enums/challenge-status.enum';
import { PipeTransform, BadRequestException } from '@nestjs/common';

export class ChallengeStatusValidationPipe implements PipeTransform {
  readonly validStatus = [
    ChallengeStatus.ACCEPT,
    ChallengeStatus.DENIED,
    ChallengeStatus.CANCELED,
  ];

  transform(value: any) {
    const status = value.status.toUpperCase();
    const valid = this.validStatus.indexOf(status);
    if (valid === -1) {
      throw new BadRequestException(`${status} is invalid status`);
    }
    return value;
  }
}
