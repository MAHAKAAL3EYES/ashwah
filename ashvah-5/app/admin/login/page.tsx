import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Staff Login",
  robots: { index: false, follow: false },
};

function LoginFormFallback() {
  return (
    <div className="space-y-4">
      <div className="h-[68px] animate-pulse border border-hairline bg-black/5" />
      <div className="h-[68px] animate-pulse border border-hairline bg-black/5" />
      <div className="h-11 animate-pulse bg-black/10" />
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bone px-5">
      <div className="w-full max-w-sm">
        {/* Wordmark */}
        <div className="mb-10 text-center">
          <div className="font-display text-2xl font-semibold tracking-tight">
            ASHVAH
          </div>
          <p className="eyebrow mt-1">Staff Platform</p>
        </div>

        <div className="border border-hairline bg-white">
          <div className="border-b border-hairline px-6 py-4">
            <p className="font-mono text-xs uppercase tracking-wider text-silver">
              Secure login
            </p>
          </div>

          <div className="p-6">
            <Suspense fallback={<LoginFormFallback />}>
              <LoginForm />
            </Suspense>
          </div>
        </div>

        <p className="mt-6 text-center font-mono text-xs leading-relaxed text-silver">
          Authorised staff only. Access is logged. Contact a super admin if you
          need an account.
        </p>
      </div>
    </div>
  );
}
