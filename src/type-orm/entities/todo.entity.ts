import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'todo' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  items: string;

  @Column()
  checked: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
