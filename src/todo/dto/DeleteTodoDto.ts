import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteTodoDto {
  @IsNotEmpty()
  @IsUUID()
  todoId: string;
}
