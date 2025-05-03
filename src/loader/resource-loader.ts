import type { TeableLoaderOptions } from "./teable-loader.types";

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
    .then((table) => table.records)
    .catch((error) => console.error("Error:", error));
};
