import { IsNotEmpty, IsMobilePhone } from 'class-validator'

export class UpdatePlayerDto {
  @IsNotEmpty()
  readonly name: string
  @IsNotEmpty()
  @IsMobilePhone()
  readonly cellphone: string
}