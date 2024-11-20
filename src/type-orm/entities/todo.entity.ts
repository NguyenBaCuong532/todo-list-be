import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'todo' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item: string;

  @Column({ default: false })
  checked: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
