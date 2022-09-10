import { PartialType } from "@nestjs/swagger";
import { districtsDto } from "./create-references_table.dto";

export class UpdateReferencesTableDto extends PartialType(districtsDto) {}
