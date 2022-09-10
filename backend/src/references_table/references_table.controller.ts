import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ReferencesTableService } from "./references_table.service";
import {
  districtsDto,
  service_subtypesDto,
  service_typesDto,
} from "./dto/create-references_table.dto";
import { UpdateReferencesTableDto } from "./dto/update-references_table.dto";

@Controller("referencesTable")
export class ReferencesTableController {
  constructor(
    private readonly referencesTableService: ReferencesTableService
  ) {}

  @Get()
  findAll() {
    return this.referencesTableService.findAll();
  }
}
