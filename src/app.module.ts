import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        HOST:Joi.string().required(),
        PORT:Joi.number().required(),
        DB_USERNAME:Joi.string().required(),
        DB_PASSWORD:Joi.string().required(),
        NAME_DB:Joi.string().required(),

      }),
    }),
    DatabaseModule,
    UsersModule,
  ],
  providers: [],
})
export class AppModule {}
