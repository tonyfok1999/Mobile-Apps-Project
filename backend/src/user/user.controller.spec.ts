import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

describe('UserController', () => {
  // Arrange
  const moduleMocker = new ModuleMocker(global);
  let controller: UserController;

  const result = [
    {
      id: 1,
      email: 'admin1@gmail.com',
      nickname: 'admin1',
      phone: 90000001,
      gender_id: 1,
      profile_photo: null,
      is_worker: false,
      worker_info_id: null,
      score: null,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    })
      .useMocker((token) => {
        if (token === UserService) {
          return {
            // Act
            findAll: jest.fn().mockResolvedValue(result),
            getUserById: jest.fn().mockResolvedValue(result),
            findUserById: jest.fn().mockResolvedValue(result),
            checkEmail: jest.fn().mockResolvedValue(result),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get(UserController);
  });
  describe('userController', () => {
    // Assert
    it('find all user', async () => {
      expect(await controller.findAll()).toEqual(result);
    });

    it('get user info by id', async () => {
      expect(await controller.getUserById(2)).toEqual(result);
    });

    it('get current user', async () => {
      const req = { user: { id: 1 } };
      // @ts-ignore
      expect(await controller.findUserById(req)).toEqual(result);
    });

    it('check email', async () => {
      expect(await controller.checkEmail({ email: 'whatever' })).toEqual({ isDuplicate: true });
    });
  });
});
