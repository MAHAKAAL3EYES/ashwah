import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { enquirySchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** True only when Supabase env vars are genuinely absent (local dev). */
function supabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { website, product_slug, ...data } = parsed.data;

  // Honeypot — if the hidden 'website' field is filled, silently accept.
  if (website && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // If Supabase genuinely isn't configured, do not pretend to save.
  if (!supabaseConfigured()) {
    console.warn("[enquiry] Supabase not configured — enquiry not persisted.");

    return NextResponse.json(
      {
        ok: false,
        error:
          "Enquiries aren't connected yet. Please WhatsApp or call us directly.",
        code: "not_configured",
      },
      { status: 503 }
    );
  }

  const headers = request.headers;

  const ipAddress =
    headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    headers.get("x-real-ip") ??
    null;

  const userAgent = headers.get("user-agent") ?? null;
  const referrer = headers.get("referer") ?? null;

  try {
    // Cast to any because the generated Supabase DB types are not wired correctly.
    // Without this, TypeScript treats table rows as `never`.
    const supabase = createClient() as any;

    let product_id: string | null = null;
    let category_id: string | null = null;

    if (product_slug) {
      const { data: prod } = await supabase
        .from("products")
        .select("id")
        .eq("slug", product_slug)
        .maybeSingle();

      if (prod?.id) {
        product_id = prod.id;
      } else {
        const { data: cat } = await supabase
          .from("categories")
          .select("id")
          .eq("slug", product_slug)
          .maybeSingle();

        if (cat?.id) {
          category_id = cat.id;
        }
      }
    }

    const enquiryInsert = {
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      company: data.company || null,
      city: data.city || null,
      message: data.message || null,
      enquiry_type: data.enquiry_type || null,
      fabric_category: data.fabric_category || null,
      requirement_qty: data.requirement_qty || null,
      preferred_contact: data.preferred_contact || null,
      product_id,
      category_id,
      source: "contact_form",
      status: "new",
      ip_address: ipAddress,
      user_agent: userAgent,
      referrer,
    };

    const { error } = await supabase.from("enquiries").insert(enquiryInsert);

    if (error) {
      console.error("[enquiry] Supabase insert failed:", error.message);

      return NextResponse.json(
        {
          ok: false,
          error:
            "We couldn't save your enquiry. Please WhatsApp or call us so it isn't lost.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[enquiry] unexpected error:", err);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
