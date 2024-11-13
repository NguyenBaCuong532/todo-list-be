import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/type-orm/entities/Todo';
import { User } from 'src/type-orm/entities/User';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
    imports:[TypeOrmModule.forFeature([User,Todo])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
