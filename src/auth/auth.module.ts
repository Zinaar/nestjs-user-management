import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/core/user/user.module';
import { EncryptPassword } from 'src/utils/encrypt.password';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
    }),
  ],

  providers: [
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    EncryptPassword,
    JwtStrategy,
    RolesGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
