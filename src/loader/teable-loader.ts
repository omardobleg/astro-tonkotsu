import type { Loader } from "astro/loaders";
import type { TeableLoaderOptions } from "./teable-loader.types";
import { loader } from "./loader";
import { generateSchema } from "./schema";

export function teableLoader(options: TeableLoaderOptions): Loader {
  return {
    name: "teable-loader",
    // Load the entries from the collection
    load: async (context) => loader(context, options),
    // Generate the schema for the collection according to the API
    schema: async () => await generateSchema(options),
  };
}
