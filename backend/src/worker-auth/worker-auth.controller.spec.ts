import { Test, TestingModule } from '@nestjs/testing';
import { WorkerAuthController } from './worker-auth.controller';

describe('WorkerAuthController', () => {
  let controller: WorkerAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkerAuthController],
    }).compile();

    controller = module.get<WorkerAuthController>(WorkerAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
