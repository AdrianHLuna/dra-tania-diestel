import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Dominio temporal de Vercel (antes de asignar el dominio final del
// cliente) — nunca debe indexarse, para no competir después con el dominio
// real ni dejar URLs huérfanas indexadas cuando el dominio cambie. Se basa
// en el host real de la petición, no en una variable de entorno — así deja
// de aplicar solo con asignar el dominio final en Vercel, sin tocar código.
function isTemporaryVercelDomain(host: string): boolean {
  return host.endsWith(".vercel.app");
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  if (isTemporaryVercelDomain(request.nextUrl.hostname)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
