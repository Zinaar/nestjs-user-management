import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/core/user/user.service';
import { EncryptPassword } from 'src/utils/encrypt.password';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encryptPassword: EncryptPassword,
    private readonly jwtService: JwtService,
  ) {}

  async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.checkUser(username);

    if (!user) return;
    const salt = user.password.split('.')[1];
    const passwordHash = await this.encryptPassword.hashPassword(
      password,
      salt,
    );

    if (user && user.password === passwordHash) {
      const payload = {
        username: user.username,
        role: user.role,
      };
      const token = this.jwtService.sign(payload, {
        secret: process.env.SECRET,
        expiresIn: '24h',
      });

      return { token };
    }
    return null;
  }
}
