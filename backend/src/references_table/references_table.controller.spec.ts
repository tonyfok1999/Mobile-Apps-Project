import { Test, TestingModule } from '@nestjs/testing';
import { ReferencesTableController } from './references_table.controller';
import { ReferencesTableService } from './references_table.service';

describe('ReferencesTableController', () => {
  let controller: ReferencesTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReferencesTableController],
      providers: [ReferencesTableService],
    }).compile();

    controller = module.get<ReferencesTableController>(ReferencesTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
