import { PipeTransform, ArgumentMetadata } from "@nestjs/common";

export class PlayersParametersValidationPipe implements PipeTransform {
  transform (value: any, metaData: ArgumentMetadata) {
    console.log(`value: ${value} - metaData: ${metaData} `)
    return value
  }
}