import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty({ message: 'item is not empty' })
  item: string;
}
