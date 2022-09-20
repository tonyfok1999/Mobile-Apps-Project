import { Test, TestingModule } from '@nestjs/testing';
import { WorkerAuthController } from './worker-auth.controller';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { UserService } from 'src/user/user.service';

describe('WorkerAuthController', () => {
  // Arrange
  const moduleMocker = new ModuleMocker(global);
  let controller: WorkerAuthController;

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
      controllers: [WorkerAuthController],
    })
      .useMocker((token) => {
        if (token === UserService) {
          return {
            // Act
            register: jest.fn().mockResolvedValue({ message: 'register_success' }),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get(WorkerAuthController);
  });
  describe('userController', () => {
    it('register', async () => {
      expect(
        controller.register({
          email: null,
          password: null,
          nickname: null,
          phone: null,
          is_worker: null,
          workerSubtypeId: null,
        })
      ).toEqual({ message: 'register_success' });
    });
  });
});
