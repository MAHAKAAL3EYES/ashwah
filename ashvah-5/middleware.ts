import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database";

type CookieToSet = {
  name: string;
  value: string;
  options: CookieOptions;
};

type StaffUser = {
  id: string;
  is_active: boolean | null;
  role: string | null;
};

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.redirect(new URL("/admin/login?error=config", request.url));
  }

  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({
          request,
        });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    if (user) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return response;
  }

  if (pathname.startsWith("/admin")) {
    if (!user) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const { data: staffData } = await (supabase as any)
      .from("staff_users")
      .select("id, is_active, role")
      .eq("id", user.id)
      .single();

    const staff = staffData as StaffUser | null;

    if (!staff || staff.is_active !== true) {
      return NextResponse.redirect(
        new URL("/admin/login?error=inactive", request.url)
      );
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
