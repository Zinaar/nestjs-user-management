import { CreateUserDTO } from '../../common/dtos';

export function userStub(): CreateUserDTO {
  return {
    firstname: 'testFirstname',
    username: 'testUsername',
    password: 'testPassword',
  };
}
