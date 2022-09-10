import { Injectable } from "@nestjs/common";
import { InjectKnex, Knex } from "nestjs-knex";
import { districtsDto } from "./dto/create-references_table.dto";
import { UpdateReferencesTableDto } from "./dto/update-references_table.dto";

@Injectable()
export class ReferencesTableService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async findAll() {
    const districts = await this.knex.select("*").from("districts_of_hk");
    const types = await this.knex.select("*").from("service_types");
    const subtypes = await this.knex.select("*").from("service_subtypes");

    const referencesTable = [districts, types, subtypes];

    return referencesTable;
  }
}
