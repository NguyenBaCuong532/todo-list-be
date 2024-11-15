import { CreateUserDto } from './../../dto/createuser.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get()
  checkLogin(@Req() req) {
    console.log(req.user.username);
    return req.user;
  }

  @Post('create')
  createUser(@Body(ValidationPipe) dataUser: CreateUserDto) {
    return this.userService.createUser(dataUser);
  }
}
