import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './type-orm/entities/User';
import { Todo } from './type-orm/entities/Todo';
import { UsersService } from './users/services/users/users.service';
import { UsersController } from './users/controllers/users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'root',
      database:'todo_list',
      entities:[User,Todo],
      synchronize:true
    }
  ), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
