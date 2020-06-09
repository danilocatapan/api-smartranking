import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";

export class PlayersParametersValidationPipe implements PipeTransform {
  transform (value: any, metaData: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(`The parameter ${metaData.data} can't be empty`)
    }
    return value
  }
}