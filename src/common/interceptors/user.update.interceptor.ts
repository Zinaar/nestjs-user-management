import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class UpdateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const res = context.switchToHttp().getResponse();
    return next.handle().pipe(
      tap((user) => {
        if (!user) return;
        res.setHeader('Last-Modified', user.updatedAt);
      }),
    );
  }
}
