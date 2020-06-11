import { IsNotEmpty, IsEmail, IsMobilePhone, IsString } from 'class-validator'

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  @IsMobilePhone()
  readonly cellphone: string
}