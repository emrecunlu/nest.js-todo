import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from 'src/todo/dto/CreateTodoDto';
import { DeleteTodoDto } from 'src/todo/dto/DeleteTodoDto';
import { UpdateTodoDto } from 'src/todo/dto/UpdateTodoDto';
import { TodoEntity } from 'src/typeorm/entities/TodoEntity';
import { UserService } from 'src/user/services/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
    private userService: UserService,
  ) {}

  async isUserTodo(userId: string, todoId: string) {
    const todo = await this.todoRepository.findOneBy({
      id: todoId,
      user: {
        id: userId,
      },
    });

    if (!todo) {
      throw new NotFoundException('Böyle bir todo bulunamadı!');
    }

    return todo;
  }

  async create(userId: string, createTodoDto: CreateTodoDto) {
    const user = await this.userService.get({ id: userId });
    const todo = this.todoRepository.create({ ...createTodoDto, user });
    return this.todoRepository.save(todo);
  }

  async getAll(userId: string) {
    return this.todoRepository.find({
      order: { createdAt: 'DESC' },
      where: { user: { id: userId } },
    });
  }

  async update(userId: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.isUserTodo(userId, updateTodoDto.todoId);
    const newTodo = Object.assign(todo, updateTodoDto);

    return await this.todoRepository.save(newTodo);
  }

  async remove(userId: string, deleteTodoDto: DeleteTodoDto) {
    const todo = await this.isUserTodo(userId, deleteTodoDto.todoId);

    await this.todoRepository.delete(todo.id);

    return todo;
  }
}
