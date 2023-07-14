import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm/entities/UserEntity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from 'src/user/dto/CreateUserDto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async get(where: FindOptionsWhere<UserEntity>): Promise<UserEntity> {
    return this.userRepository.findOneBy(where);
  }

  async update(id: string, credentials: QueryDeepPartialEntity<UserEntity>) {
    return await this.userRepository.update(id, credentials);
  }
}
