import { IsNotEmpty, IsEmail, isNotEmpty, IsPhoneNumber, IsMobilePhone } from 'class-validator'

export class CreatePlayerDto {
  @IsNotEmpty()
  readonly name: string
  @IsEmail()
  readonly email: string
  @IsNotEmpty()
  @IsMobilePhone()
  readonly cellphone: string
}