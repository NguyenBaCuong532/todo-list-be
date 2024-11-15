import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'todo' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  checked: string;
}
