import { AuthService } from './auth.service';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalGuard } from './guard/local.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(req.user, res);
  }

  @UseGuards(LocalGuard)
  @Get('logout')
  async logout(@Res() res: Response) {
    console.log(res);
    if (!res.cookie)
      throw new HttpException('cookie is valid', HttpStatus.BAD_REQUEST);
    this.authService.logout(res);
    return res.status(200).send('Logout Success');
  }
}
