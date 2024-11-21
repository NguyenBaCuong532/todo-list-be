import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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
  @Get(':id/me')
  async getAllTodo(@Param('id', ParseIntPipe) userId: number) {
    return this.todoService.getAllTodo(userId);
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
  // @UseGuards(JwtGuard)
  @Get('/:id/search')
  async searchTodos(@Param('id') userId: number, @Query('q') search: string) {
    console.log({ search });
    return this.todoService.searchTodos(userId, search);
  }
}
