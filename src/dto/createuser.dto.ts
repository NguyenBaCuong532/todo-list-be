import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'username is not empty' })
  username: string;
  @IsNotEmpty({ message: 'password is not empty' })
  password: string;
  @IsNotEmpty({ message: 'fullname is not empty' })
  fullname: string;
}
