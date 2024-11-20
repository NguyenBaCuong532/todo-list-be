import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from 'src/dto/createtodo.dto';
import { UpdateTodoDto } from 'src/dto/updatetodo.dto';
import { Todo } from 'src/type-orm/entities/todo.entity';
import { User } from 'src/type-orm/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}
  async getAllTodo() {
    // return this.todoRepository.find({ relations: ['user'] });
    return this.todoRepository.find();
  }

  async createTodo(user: User, createTodo: CreateTodoDto) {
    const newTodo = await this.todoRepository.create({
      ...createTodo,
      user,
    });
    return this.todoRepository.save(newTodo);
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOne({
      where: { id },
    });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    console.log(updateTodoDto);

    Object.assign(todo, updateTodoDto);
    console.log(Object);

    return this.todoRepository.save(todo);
  }

  async deleteTodo(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return await this.todoRepository.remove(todo);
  }
}
