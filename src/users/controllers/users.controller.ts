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
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreateTodoDto } from 'src/dto/createtodo.dto';
import { UpdateTodoDto } from 'src/dto/updatetodo.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get()
  getUser(@Req() req) {
    return req.user;
  }

  @Post(':id/todo')
  createTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() createTodo: CreateTodoDto,
  ) {
    return this.userService.createTodo(id, createTodo);
  }

  @Patch(':id/todo')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.userService.updateTodo(id, updateTodoDto);
  }

  @Delete(':id/todo')
  async deleteTodo(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.deleteTodo(id);
  }
}
