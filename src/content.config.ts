// 1. Importa las utilidades de `astro:content`
import { z, defineCollection } from "astro:content";
import { TEABLE_TOKEN, TEABLE_URL } from "astro:env/server";
import { teableLoader } from "./loader/teable-loader.ts";
import { PokemonSchema } from "./loader/schema.ts";
// 2. Define tu colección(es)
const pokemonCollection = defineCollection({
  loader: teableLoader({
    url: TEABLE_URL,
    token: TEABLE_TOKEN,
    jsonSchema: PokemonSchema,
    table: "tbl6DiJYHNEummvrHwa",
    fieldKeyType: "name",
    take: 1000,
  }),
  schema: PokemonSchema,
});
// 3. Exporta un único objeto `collections` para registrar tu(s) colección(es)
//    Esta clave debe coincidir con el nombre de tu directorio de colección en "src/content"
export const collections = {
  pokemon: pokemonCollection,
};
