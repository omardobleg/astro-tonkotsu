import type { TeableLoaderOptions } from "./teable-loader.types";
import fs from "fs";
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
      fs.writeFileSync(BACKUP_PATH, JSON.stringify(r));
      return r;
    })
    .then((table) => table.records)
    .catch((error) => {
      console.error("Error:", error);
      const resp = fs.readFileSync(BACKUP_PATH, "utf-8");
      const object = JSON.parse(resp);
      return object.records;
    });
};
