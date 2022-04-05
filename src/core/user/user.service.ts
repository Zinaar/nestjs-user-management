import { Injectable } from '@nestjs/common';
import { CreateUserDTO, PaginationDTO, UpdateUserDto } from 'src/common/dtos';
import { UserRepository } from 'src/database/repositories';
import { EncryptPassword } from 'src/utils/encrypt.password';
import { IUsers } from '../../common/interfaces';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryptPassword: EncryptPassword,
  ) {}

  async createUser(user: CreateUserDTO): Promise<IUsers> {
    const checkUser = await this.userRepository.checkUser(user.username);
    if (checkUser) throw new Error('Username already exists');

    const password = await this.encryptPassword.hashPassword(user.password);
    user.password = password;
    return this.userRepository.createUser(user);
  }

  async findUser(username: string): Promise<IUsers> {
    return this.userRepository.findUser(username);
  }

  async checkUser(username: string): Promise<IUsers> {
    return this.userRepository.checkUser(username);
  }

  async findAll({ skip, limit }: PaginationDTO): Promise<IUsers[]> {
    return this.userRepository.findAll({ skip, limit });
  }

  async softDelete(username: string): Promise<IUsers> {
    return this.userRepository.softDelete(username);
  }

  async updateUser(user: UpdateUserDto, username: string): Promise<IUsers> {
    const password = await this.encryptPassword.hashPassword(user.password);
    const userUpdate = {
      password,
      firstname: user.firstname,
      lastname: user.lastname,
    };

    return this.userRepository.updateUser(username, userUpdate);
  }
  async addAvatarImage(username: string, url: string): Promise<any> {
    const user = await this.userRepository.checkUser(username);
    if (!user || user.avatar) return;
    await this.userRepository.addAvatarUrl(username, url);
    return;
  }
}
