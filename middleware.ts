// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow all routes - authentication is handled client-side with localStorage
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
