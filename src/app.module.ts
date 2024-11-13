import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './type-orm/entities/User.entity';
import { Todo } from './type-orm/entities/Todo.entity';
import { UsersService } from './users/services/users/users.service';
import { UsersController } from './users/controllers/users/users.controller';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // TypeOrmModule.forRoot(
    // {
    //   type:'mysql',
    //   host:'localhost',
    //   port:3306,
    //   username:'root',
    //   password:'root',
    //   database:'todo_list',
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('HOST'),
        port: +configService.get('PORT'),
        username: configService.get('USERNAME'),
        password: configService.get('PASSWORD'),
        database: configService.get('NAME_DB'),
      entities:[User,Todo],
      synchronize:true
      })
    }
  ), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
