import { Module } from '@nestjs/common';
import { ReferencesTableService } from './references_table.service';
import { ReferencesTableController } from './references_table.controller';

@Module({
  controllers: [ReferencesTableController],
  providers: [ReferencesTableService]
})
export class ReferencesTableModule {}
