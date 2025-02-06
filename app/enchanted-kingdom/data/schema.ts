import { z } from "zod";

export const paymentSchema = z.object({
  transNumber: z.string().nonempty("Please provide the transaction number"),
  locName: z.string().nonempty("Please provide the location name"),
  transStatus: z.string(),
  dateCreated: z.string().nonempty("Please provide the creation date"),
  dateCompleted: z.string().optional().nullable(),
});

export type Payment = z.infer<typeof paymentSchema>;
