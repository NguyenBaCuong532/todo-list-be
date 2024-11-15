import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Todo } from 'src/type-orm/entities/todo.entity';
import { User } from 'src/type-orm/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Todo])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
