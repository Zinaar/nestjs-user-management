import { UserController } from '../core/user/user.controller';
import { UserService } from '../core/user/user.service';
import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { EncryptPassword } from '../utils/encrypt.password';
import { paginationStub, userStub } from './stubs';

jest.setTimeout(30000);
describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let encryptPassword: EncryptPassword;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: createMock<UserService>(),
        },
        {
          provide: EncryptPassword,
          useValue: createMock<EncryptPassword>(),
        },
        {
          provide: AuthService,
          useValue: createMock<AuthService>(),
        },
      ],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
    encryptPassword = moduleRef.get<EncryptPassword>(EncryptPassword);
    jest.clearAllMocks();
  });

  describe('find', () => {
    beforeEach(async () => {
      await userController.findUserController(userStub().username);
    });
    test('it should call userservice', () => {
      expect(userService.findUser).toBeCalledWith(userStub().username);
    });
  });

  describe('createUserController', () => {
    describe('when createUserController is called', () => {
      beforeEach(async () => {
        await userController.createUserController(userStub());
      });

      test('it should call userservice', () => {
        expect(userService.createUser).toBeCalledWith(userStub());
      });
    });
  });

  describe('findall', () => {
    beforeEach(async () => {
      await userController.findAllUsersController(paginationStub());
    });
    test('it should call userservice', () => {
      expect(userService.findAll).toBeCalledWith(paginationStub());
    });
  });

  describe('softDelete', () => {
    beforeEach(async () => {
      await userController.softDelete(userStub().username);
    });
    test('it should call userservice', () => {
      expect(userService.softDelete).toBeCalledWith(userStub().username);
    });
  });
});
