import { Test, TestingModule } from '@nestjs/testing';
import { ReferencesTableService } from './references_table.service';

describe('ReferencesTableService', () => {
  let service: ReferencesTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferencesTableService],
    }).compile();

    service = module.get<ReferencesTableService>(ReferencesTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
