import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/createuser.dto';
import { User } from 'src/type-orm/entities/user.entity';
import { encodePass } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createUser(createUserDetail: CreateUserDto) {
    const password = await encodePass(createUserDetail.password);
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
