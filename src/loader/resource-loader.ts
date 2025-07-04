import { type Pokemon } from "./schema";
import consola from "consola";
import type { TeableLoaderOptions } from "./teable-loader.types";
import fs from "fs";
import superjson from "superjson";

const BACKUP_PATH = "./src/backup/table.json";
export const tableLoader = (options: TeableLoaderOptions) => {
  const base = options.url;
  const table = options.table;
  const url = new URL(`${base}/api/table/${table}/record`);
  const params = {
    fieldKeyType: options.fieldKeyType ?? "name",
    take: options.take ?? 100,
  };

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value + "");
  });
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${options.token}`,
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((r) => {
      fs.writeFileSync(BACKUP_PATH, superjson.stringify(r));
      return r;
    })
    .then((table) => table.records)
    .catch((error) => {
      consola.error(`Error loading data: ${superjson.stringify({ error })}`);
      const resp = fs.readFileSync(BACKUP_PATH, "utf-8");
      const object = superjson.parse<{ records: Pokemon[] }>(resp);
      return object.records;
    });
};
