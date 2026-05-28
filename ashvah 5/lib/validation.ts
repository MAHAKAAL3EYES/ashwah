import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().min(2, "Name is required").max(120),
  phone: z
    .string()
    .min(10, "Phone is required")
    .max(20)
    .regex(/^[+0-9\s\-()]+$/, "Enter a valid phone number"),
  email: z
    .string()
    .email("Enter a valid email")
    .max(160)
    .optional()
    .or(z.literal("")),
  company: z.string().max(160).optional().or(z.literal("")),
  city: z.string().max(120).optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal("")),
  // Structured B2B lead fields
  enquiry_type: z.string().max(60).optional().or(z.literal("")),
  fabric_category: z.string().max(80).optional().or(z.literal("")),
  requirement_qty: z.string().max(120).optional().or(z.literal("")),
  preferred_contact: z.string().max(40).optional().or(z.literal("")),
  product_slug: z.string().max(120).optional().or(z.literal("")),
  // Anti-spam honeypot
  website: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
