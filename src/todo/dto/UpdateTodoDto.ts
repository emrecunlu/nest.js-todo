import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class UpdateTodoDto {
  @IsNotEmpty()
  @IsUUID()
  todoId: string;

  @IsString()
  @Length(3, 100)
  title: string;

  @IsBoolean()
  @IsOptional()
  completed: boolean;
}
