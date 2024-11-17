import { ConfigService } from '@nestjs/config';
import { Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import ms from 'ms';
import { Response } from 'express';
import { UsersService } from 'src/users/services/users.service';
import { compareSync } from 'bcrypt';
import { User } from 'src/type-orm/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOne(username);
    if (user && compareSync(pass, user.password)) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User, @Res() res: Response) {
    const payload = { username: user, idUser: user.id };
    const expires = new Date();
    const token = this.jwtService.sign(payload);
    expires.setMilliseconds(expires.getMilliseconds() + ms('1h'));
    res.cookie('auth', token, {
      expires: expires,
      httpOnly: true,
      secure: false,
      maxAge: ms(
        String(
          this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
        ),
      ),
    });
    return { token };
  }
  async logout(@Res() res: Response) {
    return res.clearCookie('auth');
  }
}
