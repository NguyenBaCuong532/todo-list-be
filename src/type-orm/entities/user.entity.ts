import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Todo } from './todo.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
  @Column()
  fullname: string;

  @Column()
  createAt: Date;

  @Column({ default: 0 })
  role: string;

  @OneToOne(() => Todo)
  @JoinColumn()
  todo: Todo;
}
