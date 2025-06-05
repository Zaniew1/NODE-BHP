import { z } from "zod";

const CompanyCreateSchema = z.object({
  name: z.string({required_error: "Name is required"})
  .trim()
  .min(3, "Email to short, 3 chars minimum")
  .max(50, "Email to long, 50 chars maximum"),
  author: z.number({required_error: "Author is required"}),
  nip:z.string({required_error: "NIP is required"})
  .min(10, "NIP too short, 10 chars minimum")
  .max(10, "NIP too long, 10 chars maximum")
  .trim(),
  regon: z.string()
  .min(9, "REGON too short, 9 chars minimum" )
  .max(14, "REGON too long, 14 chars minimum" )
  .trim()
  .optional(),
  pkd: z.array(z.string().max(11, "PKD is too long").trim()),
  postalCode: z.string().includes("-").min(6, "Postal Code too short").max(6, "Postal Code too long").trim().optional(),
  city: z.string().min(2, "City name too short").max(100, "City name too long").trim().optional(),
  street: z.string().min(2, "Street name too short").max(100, "Street name too long").trim().optional(),
  phoneNumber: z.string().min(9, "Phone number too short").max(11, "Phone number too long").optional(),
  email: z.string().email("Invalid email address").optional(),
  notes: z.string().length(10000000).optional(),
});

export type CompanyCreateSchemaType = z.infer<typeof CompanyCreateSchema>;



export default CompanyCreateSchema;
