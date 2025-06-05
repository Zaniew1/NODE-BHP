import { z } from "zod";

const WorkerCreateSchema = z.object({
    name: z.string({required_error: "Name is required"})
    .trim()
    .min(3, "Name to short, 3 chars minimum")
    .max(50, "Name too long, 50 chars maximum"),
    secondName: z.string({required_error: "Second Name is required"})
    .trim()
    .min(3, "Second Name to short, 3 chars minimum")
    .max(50, "Second Name too long, 50 chars maximum")
    .optional(),
    surname: z.string({required_error: "Surname is required"})
    .trim()
    .min(3, "Surname to short, 3 chars minimum")
    .max(50, "Surname too long, 50 chars maximum"),
    author: z.number({required_error: "Author is required"}),
    sex:z.enum(["Salmon", "Tuna", "Trout"],{required_error: "NIP is required"}).optional(),
  
    trainingEntry: z.string().datetime().optional(),
    trainingPeriodic: z.string().datetime().optional(),
    medicalExamination: z.string().datetime().optional(),
    companyId: z.number(),
    department: z.string().max(300).optional(),
    employmentForm: z.string().max(300).optional(),
    absence: z.string().max(300).optional(),
    pesel: z.string().length(11).optional(),
    IdCardNumber: z.string().length(11).optional(),
    dateOfBirth: z.string().datetime().optional(),

    placeOfBirth: z.string()
    .trim()
    .max(50, "Place of birth too long, 100 chars maximum"),
    disability: z.boolean().optional(),

    postalCode: z.string().includes("-").min(6, "Postal Code too short").max(6, "Postal Code too long").trim().optional(),
    city: z.string().min(2, "City name too short").max(100, "City name too long").trim().optional(),
    street: z.string().min(2, "Street name too short").max(100, "Street name too long").trim().optional(),
    phoneNumber: z.string().min(9, "Phone number too short").max(11, "Phone number too long").optional(),
    email: z.string().email("Invalid email address").optional(),

    position: z.string().trim().optional(),
    positionType: z.string().trim().optional(),
    positionSection: z.string().trim().optional(),
    positionNotes: z.string().max(10000000).optional(),

    youth: z.boolean().optional(),
    nightShift: z.boolean().optional(),

    notes: z.string().max(10000000).optional(),
});

export type WorkerCreateSchemaType = z.infer<typeof WorkerCreateSchema>;



export default WorkerCreateSchema;
