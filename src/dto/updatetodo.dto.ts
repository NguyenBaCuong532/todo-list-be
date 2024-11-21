import { IsNotEmpty } from 'class-validator';

export class UpdateTodoDto {
  @IsNotEmpty({ message: 'item is not empty' })
  item: string;

  checked: boolean;
}
