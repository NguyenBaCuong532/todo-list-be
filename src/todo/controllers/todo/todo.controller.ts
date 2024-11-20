import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import RequestWithUser from 'src/auth/interfaces/requestUser.interface';
import { CreateTodoDto } from 'src/dto/createtodo.dto';
import { UpdateTodoDto } from 'src/dto/updatetodo.dto';
import { TodoService } from 'src/todo/services/todo/todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @UseGuards(JwtGuard)
  @Get('me')
  async getAllTodo() {
    return this.todoService.getAllTodo();
  }

  @UseGuards(JwtGuard)
  @Post('create')
  createTodo(
    @Req() req: RequestWithUser,
    @Body(ValidationPipe) createTodo: CreateTodoDto,
  ) {
    return this.todoService.createTodo(req.user, createTodo);
  }

  @UseGuards(JwtGuard)
  @Patch(':id/item')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTodoDto: UpdateTodoDto,
  ) {
    console.log(123);
    return this.todoService.updateTodo(id, updateTodoDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id/item')
  async deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.deleteTodo(id);
  }
}
