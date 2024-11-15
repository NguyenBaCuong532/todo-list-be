import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          const token = req.cookies?.auth;
          console.log(req.cookies);
          return token;
        },
      ]),

      ignoreExpiration: false,
      secretOrKey: 'HoaiMy',
    });
  }

  async validate(payload) {
    console.log(payload);
    return payload.username;
  }
}
