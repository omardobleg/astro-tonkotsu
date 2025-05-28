import type { MiddlewareHandler } from "astro";
import consola from "consola";

type Path = string;
interface ICachedResponse {
  response: Response;
  expires: number;
}

const cache = new Map<Path, ICachedResponse>();

export const onRequest: MiddlewareHandler = async (req, next) => {
  consola.info(`[Middleware] onRequest ${req.url.pathname}`);
  let ttl: number | undefined;
  // Add a `cache` method to the `req.locals` object
  // that will allow us to set the cache duration for each page.
  req.locals.cache = (seconds: number = 60) => {
    ttl = seconds;
  };

  const cached = cache.get(req.url.pathname);

  if (cached && cached.expires > Date.now()) {
    consola.info(`[Middleware] cached request ${req.url.pathname}`);
    return cached.response.clone();
  } else if (cached) {
    consola.warn(`[Middleware] clearing cache  ${req.url.pathname}`);
    cache.delete(req.url.pathname);
  }

  const response = await next();

  // If the `cache` method was called, store the response in the cache.
  if (ttl !== undefined) {
    cache.set(req.url.pathname, {
      response: response.clone(),
      expires: Date.now() + ttl * 1000,
    });
    consola.start(`[Middleware] caching request ${req.url.pathname}`);
  }

  return response;
};
