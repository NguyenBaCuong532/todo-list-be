import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from 'src/dto/createtodo.dto';
import { CreateUserDto } from 'src/dto/createuser.dto';
import { Todo } from 'src/type-orm/entities/todo.entity';
import { encodePass } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { User } from './../../type-orm/entities/user.entity';
import { UpdateTodoDto } from 'src/dto/updatetodo.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
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

  async createTodo(id: number, createTodo: CreateTodoDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found.Cannot create Todo-content',
        HttpStatus.BAD_REQUEST,
      );

    const newTodo = this.todoRepository.create({
      ...createTodo,
      user,
    });
    return this.todoRepository.save(newTodo);
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(todo);
  }

  async deleteTodo(id: number): Promise<void> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    await this.todoRepository.remove(todo);
  }
}
