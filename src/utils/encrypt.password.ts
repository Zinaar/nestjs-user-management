import { Injectable } from '@nestjs/common';
import { pbkdf2, randomBytes } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class EncryptPassword {
  private encrypter = promisify(pbkdf2);

  async hashPassword(password: string, salt?: string): Promise<string> {
    salt = salt || randomBytes(16).toString('hex');
    const hashedPassword = await this.encrypter(
      password,
      salt,
      16,
      100,
      'sha512',
    );
    return [hashedPassword.toString('hex'), salt].join('.');
  }
}
