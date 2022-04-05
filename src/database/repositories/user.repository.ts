import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUsers } from 'src/common/interfaces/IUsers';
import { Model } from 'mongoose';
import { CreateUserDTO } from 'src/common/dtos/create.user.dto';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';
import { UpdateUserDto } from 'src/common/dtos/update.user.dto';
import { ISum } from 'src/common/interfaces/ISum';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<IUsers>,
    @InjectModel('Sum') private readonly sumModel: Model<ISum>,
  ) {}

  async createUser(user: CreateUserDTO): Promise<IUsers> {
    await this.sumModel.create(user);
    return this.userModel.create(user);
  }

  findUser(username: string): Partial<Promise<IUsers>> {
    return this.userModel
      .findOne({ username })
      .select([
        '-is_deleted',
        '-createdAt',
        '-updatedAt',
        '-password',
        '-_id',
        '-__v',
        '-deletedAt',
      ]);
  }

  async checkUser(username: string): Promise<IUsers> {
    return this.userModel.findOne({ username });
  }

  findAll({ skip, limit }: PaginationDTO): Partial<Promise<IUsers[]>> {
    return this.userModel
      .find()
      .skip(+skip)
      .limit(+limit)
      .select([
        '-is_deleted',
        '-createdAt',
        '-updatedAt',
        '-password',
        '-_id',
        '-__v',
        '-deletedAt',
      ]);
  }

  async softDelete(username: string): Promise<IUsers> {
    return this.userModel.findOneAndUpdate({
      username,
      is_deleted: true,
      deletedAt: Date.now(),
    });
  }

  async updateUser(
    username: string,
    userUpdate: UpdateUserDto,
  ): Promise<IUsers> {
    return this.userModel.findOneAndUpdate({ username }, userUpdate);
  }

  async addAvatarUrl(username: string, url: string): Promise<IUsers> {
    return this.userModel.findOneAndUpdate({ username }, { avatar: url });
  }
}
