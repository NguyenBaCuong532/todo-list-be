import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from 'src/dto/createtodo.dto';
import { UpdateTodoDto } from 'src/dto/updatetodo.dto';
import { Todo } from 'src/type-orm/entities/todo.entity';
import { User } from 'src/type-orm/entities/user.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}
  async getAllTodo(userId: number) {
    return this.todoRepository.find({
      where: { user: { id: userId } }, // Truy vấn dựa trên quan hệ user
      relations: ['user'], // Bao gồm quan hệ với bảng user
    });
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

  async searchTodos(userId: number, search: string) {
    console.log(search);
    return this.todoRepository.find({
      where: {
        user: { id: userId },
        item: Like(`%${search}%`),
      },
    });
  }
}
