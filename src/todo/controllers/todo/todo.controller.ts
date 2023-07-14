import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { CreateTodoDto } from 'src/todo/dto/CreateTodoDto';
import { DeleteTodoDto } from 'src/todo/dto/DeleteTodoDto';
import { UpdateTodoDto } from 'src/todo/dto/UpdateTodoDto';
import { TodoService } from 'src/todo/services/todo/todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get(':id')
  async get() {
    return 'get by id';
  }

  @Get()
  async getAll(@GetUser('id') userId: string) {
    return this.todoService.getAll(userId);
  }

  @Post('add')
  async create(
    @GetUser('id') userId: string,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    return this.todoService.create(userId, createTodoDto);
  }

  @Post('update')
  async update(
    @GetUser('id') userId: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return await this.todoService.update(userId, updateTodoDto);
  }

  @Post('delete')
  async remove(
    @Body() deleteTodoDto: DeleteTodoDto,
    @GetUser('id') userId: string,
  ) {
    return await this.todoService.remove(userId, deleteTodoDto);
  }
}
