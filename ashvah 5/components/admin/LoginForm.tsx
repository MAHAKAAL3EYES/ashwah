"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setStatus("error");
        setErrorMsg(error.message);
        return;
      }

      // Verify staff record exists
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: staff } = await supabase
          .from("staff_users")
          .select("id, is_active")
          .eq("id", user.id)
          .single();

        if (!staff || !staff.is_active) {
          await supabase.auth.signOut();
          setStatus("error");
          setErrorMsg("This account is not an active staff member.");
          return;
        }

        // Update last login
        await supabase
          .from("staff_users")
          .update({ last_login_at: new Date().toISOString() })
          .eq("id", user.id);
      }

      router.push(redirectTo);
      router.refresh();
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block font-mono text-[10px] uppercase tracking-wider text-silver"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full border border-hairline bg-white px-4 py-3 text-sm outline-none focus:border-graphite"
          placeholder="you@ashvah.in"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block font-mono text-[10px] uppercase tracking-wider text-silver"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full border border-hairline bg-white px-4 py-3 text-sm outline-none focus:border-graphite"
          placeholder="••••••••"
        />
      </div>

      {status === "error" && (
        <p className="border border-destructive/40 bg-destructive/5 px-3 py-2 text-xs text-destructive">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full disabled:opacity-60"
      >
        {status === "loading" ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
