import type { LoaderContext } from "astro/loaders";
import type { TeableLoaderOptions } from "./teable-loader.types";
import { tableLoader } from "./resource-loader";
import type { Row } from "./schema";
import { z } from "astro/zod";

export async function loader(
  context: LoaderContext,
  options: TeableLoaderOptions
): Promise<void> {
  context.logger.label = `teable-loader: ${options.table}`;

  type currentType = z.infer<typeof options.jsonSchema>;
  const data = (await tableLoader(options)) as Row<currentType>[];
  context.logger.info(`Loaded ${data?.length} items`);
  data?.forEach((element) => {
    context.store.set({ id: element.fields.Name, data: element.fields });
  });
  context.logger.info("Data stored");
}
