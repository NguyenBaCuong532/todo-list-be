import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { User } from 'src/type-orm/entities/ser.entity';
import { Todo } from 'src/type-orm/entities/odo.entity';

@Module({
    imports:[TypeOrmModule.forFeature([User,Todo])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
