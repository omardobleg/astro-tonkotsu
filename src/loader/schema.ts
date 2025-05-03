import { z } from "astro/zod";
import type { TeableLoaderOptions } from "./teable-loader.types";

const rowSchema = <T extends z.ZodTypeAny>(jsonSchema: T) =>
  z.object({
    fields: jsonSchema,
    name: z.string(),
    id: z.string(),
    autoNumber: z.number(),
    createdTime: z.string(),
    createdBy: z.string(),
  });

export const generateSchema = <T>({ jsonSchema }: TeableLoaderOptions) =>
  rowSchema(jsonSchema);

//  rowSchema(jsonSchema);
type RowSchema<T> = ReturnType<typeof generateSchema<T>>;
export type Row<T> = z.infer<RowSchema<T>>;

export const PokemonSchema = z.object({
  "Type 1": z.string(),
  Total: z.number(),
  HP: z.number(),
  Attack: z.number(),
  Defense: z.number(),
  "Sp. Atk": z.number(),
  "Sp. Def": z.number(),
  Speed: z.number(),
  Generation: z.number(),
  "#": z.number(),
  Name: z.string(),
});

export type Pokemon = z.infer<typeof PokemonSchema>;
