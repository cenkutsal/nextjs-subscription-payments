import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  if (req.method === 'POST' && req.nextUrl.pathname.startsWith('/api')) {
    const ip = req.ip ?? '127.0.0.1';
    const ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, '10 s'),
      analytics: true
    });

    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return new NextResponse('Rate limit exceeded', { status: 429 });
    }
  }
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  return res;
}
