"use client";

import { useState, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { updateEnquiryStatus, saveEnquiryNotes } from "@/lib/actions";
import { whatsappLink, telLink } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Enquiry, EnquiryStatus } from "@/types/database";

const STATUSES: EnquiryStatus[] = [
  "new",
  "contacted",
  "qualified",
  "quoted",
  "closed_won",
  "closed_lost",
  "spam",
];

const STATUS_LABEL: Record<EnquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  quoted: "Quoted",
  closed_won: "Won",
  closed_lost: "Lost",
  spam: "Spam",
};

export function EnquiriesTable({
  enquiries,
  editable,
}: {
  enquiries: Enquiry[];
  editable: boolean;
}) {
  const [filter, setFilter] = useState<EnquiryStatus | "all">("all");
  const [selected, setSelected] = useState<Enquiry | null>(null);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? enquiries
        : enquiries.filter((e) => e.status === filter),
    [enquiries, filter]
  );

  return (
    <>
      {/* Status filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          All ({enquiries.length})
        </FilterChip>
        {STATUSES.map((s) => {
          const count = enquiries.filter((e) => e.status === s).length;
          if (count === 0 && s !== "new") return null;
          return (
            <FilterChip key={s} active={filter === s} onClick={() => setFilter(s)}>
              {STATUS_LABEL[s]} ({count})
            </FilterChip>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="border border-hairline bg-white py-16 text-center text-silver">
          No enquiries{filter !== "all" ? ` with status "${STATUS_LABEL[filter as EnquiryStatus]}"` : " yet"}.
        </div>
      ) : (
        <div className="border border-hairline bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-hairline text-left">
                  <Th>Date</Th>
                  <Th>Name</Th>
                  <Th>Phone</Th>
                  <Th>Company</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr
                    key={e.id}
                    onClick={() => setSelected(e)}
                    className="cursor-pointer border-b border-hairline last:border-0 hover:bg-muted"
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-silver">
                      {new Date(e.created_at).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </td>
                    <td className="px-4 py-3 font-medium">{e.name}</td>
                    <td className="px-4 py-3 text-silver">{e.phone}</td>
                    <td className="px-4 py-3 text-silver">{e.company ?? "—"}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={e.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selected && (
        <EnquiryDrawer
          enquiry={selected}
          editable={editable}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}

function EnquiryDrawer({
  enquiry,
  editable,
  onClose,
}: {
  enquiry: Enquiry;
  editable: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [notes, setNotes] = useState(enquiry.internal_notes ?? "");
  const [status, setStatus] = useState(enquiry.status);

  const handleStatus = (s: EnquiryStatus) => {
    setStatus(s);
    startTransition(async () => {
      await updateEnquiryStatus(enquiry.id, s);
      router.refresh();
    });
  };

  const handleNotes = () => {
    startTransition(async () => {
      await saveEnquiryNotes(enquiry.id, notes);
      router.refresh();
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-graphite/30">
      <div className="h-full w-full max-w-md overflow-y-auto border-l border-hairline bg-white">
        <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
          <p className="font-display text-lg font-medium">Enquiry</p>
          <button onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {/* Contact */}
          <div className="space-y-3">
            <Row label="Name" value={enquiry.name} />
            <Row label="Phone">
              <a href={telLink(enquiry.phone)} className="text-graphite hover:text-ink">
                {enquiry.phone}
              </a>
            </Row>
            {enquiry.email && (
              <Row label="Email">
                <a href={`mailto:${enquiry.email}`} className="text-graphite hover:text-ink">
                  {enquiry.email}
                </a>
              </Row>
            )}
            {enquiry.company && <Row label="Company" value={enquiry.company} />}
            {enquiry.city && <Row label="City" value={enquiry.city} />}
            {enquiry.enquiry_type && (
              <Row label="Type" value={enquiry.enquiry_type} />
            )}
            {enquiry.fabric_category && (
              <Row label="Fabric" value={enquiry.fabric_category} />
            )}
            {enquiry.requirement_qty && (
              <Row label="Requirement" value={enquiry.requirement_qty} />
            )}
            {enquiry.preferred_contact && (
              <Row label="Prefers" value={enquiry.preferred_contact} />
            )}
            <Row
              label="Received"
              value={new Date(enquiry.created_at).toLocaleString("en-IN")}
            />
          </div>

          {/* Message */}
          {enquiry.message && (
            <div className="mt-6 border-t border-hairline pt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-silver">
                Message
              </p>
              <p className="mt-2 text-sm leading-relaxed text-graphite">
                {enquiry.message}
              </p>
            </div>
          )}

          {/* WhatsApp quick reply */}
          <a
            href={whatsappLink(
              enquiry.phone,
              `Hi ${enquiry.name}, thanks for your enquiry with ASHVAH.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6 w-full"
          >
            Reply on WhatsApp
          </a>

          {/* Status */}
          {editable && (
            <div className="mt-6 border-t border-hairline pt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-silver">
                Status
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatus(s)}
                    disabled={isPending}
                    className={cn(
                      "border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors disabled:opacity-50",
                      status === s
                        ? "border-graphite bg-graphite text-bone"
                        : "border-hairline text-silver hover:border-graphite hover:text-graphite"
                    )}
                  >
                    {STATUS_LABEL[s]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {editable && (
            <div className="mt-6 border-t border-hairline pt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-silver">
                Internal notes
              </p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="mt-2 w-full resize-none border border-hairline px-3 py-2.5 text-sm outline-none focus:border-graphite"
                placeholder="Add a note…"
              />
              <button
                onClick={handleNotes}
                disabled={isPending}
                className="btn-outline mt-3 disabled:opacity-60"
              >
                {isPending ? "Saving…" : "Save notes"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: EnquiryStatus }) {
  const isNew = status === "new";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider",
        isNew ? "text-ink" : "text-silver"
      )}
    >
      <span
        className={cn(
          "block h-1.5 w-1.5 rounded-full",
          isNew ? "bg-ink" : "bg-hairline-strong"
        )}
      />
      {STATUS_LABEL[status]}
    </span>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors",
        active
          ? "border-graphite bg-graphite text-bone"
          : "border-hairline text-silver hover:border-graphite hover:text-graphite"
      )}
    >
      {children}
    </button>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 font-mono text-[10px] font-medium uppercase tracking-wider text-silver">
      {children}
    </th>
  );
}

function Row({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="font-mono text-[10px] uppercase tracking-wider text-silver">
        {label}
      </span>
      <span className="text-right text-sm">{children ?? value}</span>
    </div>
  );
}
