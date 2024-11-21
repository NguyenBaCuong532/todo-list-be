import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import RequestWithUser from 'src/auth/interfaces/requestUser.interface';

@Controller('users')
export class UsersController {
  @UseGuards(JwtGuard)
  @Get('me')
  getUser(@Req() req: RequestWithUser) {
    return req.user;
  }
}
