import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalGuard } from './guard/local.guard';
import RequestWithUser from './interfaces/requestUser.interface';
import { CreateUserDto } from 'src/dto/createuser.dto';
import { UsersService } from 'src/users/services/users.service';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}
  @UseGuards(LocalGuard)
  @Post('login')
  async login(
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(req.user, res);
  }

  @Post('signup')
  signup(@Body(ValidationPipe) dataUser: CreateUserDto) {
    return this.userService.createUser(dataUser);
  }

  @UseGuards(LocalGuard)
  @Get('logout')
  async logout(@Res() res: Response) {
    if (!res.cookie)
      throw new HttpException('cookie is valid', HttpStatus.BAD_REQUEST);
    this.authService.logout(res);
    return res.status(200).send('Logout Success');
  }
}
