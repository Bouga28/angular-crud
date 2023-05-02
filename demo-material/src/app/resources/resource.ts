import { Type } from "../types/type";

export interface Resource {
    id: number;
    name: string;
    description: string;
    type_id: string;
    type:Type;
  }
