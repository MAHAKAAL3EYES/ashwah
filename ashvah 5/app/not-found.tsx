import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="text-center">
        <p className="font-mono text-sm uppercase tracking-wider text-silver">
          Error 404
        </p>
        <h1 className="mt-4 font-display text-display-xl font-semibold tracking-tight">
          Off the bolt.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-silver">
          This page doesn&apos;t exist — it may have moved, or the link was
          mistyped. Let&apos;s get you back to the fabric.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            Back home
          </Link>
          <Link href="/fabrics" className="btn-outline">
            Browse catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}
