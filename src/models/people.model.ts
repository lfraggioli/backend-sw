import { model } from "mongoose";
import { IPeople } from "./interfaces/IPeople";
import { peopleSchema } from "./schemas/people.schema";

export const PeopleModel = model<IPeople>("People", peopleSchema);
