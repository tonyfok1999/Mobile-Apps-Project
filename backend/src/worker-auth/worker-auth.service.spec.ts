import { Test, TestingModule } from '@nestjs/testing';
import { WorkerAuthService } from './worker-auth.service';

describe('WorkerAuthService', () => {
  let service: WorkerAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkerAuthService],
    }).compile();

    service = module.get<WorkerAuthService>(WorkerAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
