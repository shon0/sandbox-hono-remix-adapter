import type { Context } from 'hono'
import type { PlatformProxy } from 'wrangler'
import type { Env } from './env'

type GetLoadContextArgs = {
  request: Request
  context: {
    cloudflare: Omit<
      PlatformProxy<Env['Bindings']>,
      'dispose' | 'caches' | 'cf'
    > & {
      caches: PlatformProxy<Env>['caches'] | CacheStorage
      cf: Request['cf']
    }
    hono: {
      context: Context<Env>
    }
  }
}

declare module '@remix-run/cloudflare' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface AppLoadContext extends ReturnType<typeof getLoadContext> {
    // This will merge the result of `getLoadContext` into the `AppLoadContext`
    hono: {
      context: Context<Env>
    }
  }
}

export function getLoadContext({ context }: GetLoadContextArgs) {
  return {
    ...context,
  }
}
