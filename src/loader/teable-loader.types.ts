import type { z } from "astro/zod";

export interface TeableLoaderOptions {
  url: string;

  token: string;

  jsonSchema: z.ZodSchema;

  table: string;

  fieldKeyType: "name" | "id";

  take?: number;
}
