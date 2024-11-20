import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/createuser.dto';
import { encodePass } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { User } from './../../type-orm/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createUser(createUserDetail: CreateUserDto) {
    const password = await encodePass(createUserDetail.password);
    if (createUserDetail.username)
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    const newUser = this.userRepository.create({
      ...createUserDetail,
      password,
      createAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }
  async findOne(username: string) {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }
}
