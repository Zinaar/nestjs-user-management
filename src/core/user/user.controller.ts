import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RolesGuard, LocalAuthGuard, JwtAuthGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { UpdateUserDto, CreateUserDTO, PaginationDTO } from '../../common/dtos';
import { UserService } from './user.service';
import { UpdateGuard } from 'src/common/guards/user.update.guard';
import { UpdateInterceptor } from 'src/common/interceptors/user.update.interceptor';
import { IUsers } from 'src/common/interfaces';
import { ApiQuery } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('signup')
  async createUserController(
    @Body() user: CreateUserDTO,
  ): Promise<HttpException> {
    try {
      await this.usersService.createUser(user);

      return new HttpException(
        `User ${user.username} successfully registered!`,
        HttpStatus.CREATED,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('find')
  async findUserController(
    @Body('username') username: string,
  ): Promise<HttpException> {
    try {
      const user = await this.usersService.findUser(username);
      return new HttpException(user, HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('findall')
  async findAllUsersController(
    @Query() { skip, limit }: PaginationDTO,
  ): Promise<HttpException> {
    try {
      const users = await this.usersService.findAll({ skip, limit });
      return new HttpException(users, HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete')
  async softDelete(@Body('username') username: string): Promise<HttpException> {
    try {
      await this.usersService.softDelete(username);
      return new HttpException(
        `User ${username} succesfully deleted !`,
        HttpStatus.OK,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<HttpException> {
    try {
      return new HttpException(req.user, HttpStatus.OK);
    } catch (error) {
      throw new HttpException('unauthorized request', HttpStatus.UNAUTHORIZED);
    }
  }

  @Roles(Role.Admin || Role.Basic)
  @UseGuards(JwtAuthGuard, RolesGuard, UpdateGuard)
  @UseInterceptors(new UpdateInterceptor())
  @ApiQuery({ name: 'role', enum: Role })
  @Put('update')
  async updateUser(
    @Body() user: UpdateUserDto,
    @Query('username') username: string,
  ): Promise<IUsers> {
    try {
      const updatedUser = await this.usersService.updateUser(user, username);
      // return new HttpException(`user succesfully updated`, HttpStatus.OK);
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
