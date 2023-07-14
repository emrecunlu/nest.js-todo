import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 25)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 25)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 25)
  userName: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 25)
  password: string;
}
