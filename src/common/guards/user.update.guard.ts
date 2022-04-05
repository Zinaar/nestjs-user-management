import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/core/user/user.service';

@Injectable()
export class UpdateGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { username } = req.query;
    const user = await this.userService.checkUser(username);

    const latestUpdate = new Date(user.updatedAt).toUTCString();

    const ifUnmodifiedSinceHeader = req.headers['if-unmodified-since'];
    if (ifUnmodifiedSinceHeader && ifUnmodifiedSinceHeader !== latestUpdate) {
      throw new HttpException('user is modified since latest fetch', 412);
    }
    return true;
  }
}
