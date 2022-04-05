import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { EncryptPassword } from 'src/utils/encrypt.password';
import { AuthModule } from 'src/auth/auth.module';
import { UpdateGuard } from 'src/common/guards/user.update.guard';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  providers: [UserService, EncryptPassword, UpdateGuard],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
