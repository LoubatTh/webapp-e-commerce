import { z } from "zod";

export const addressSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  address: z.string().min(1, {
    message: "Address is required",
  }),
  additionnalAdress: z.string(),
  postalCode: z.string().min(1, {
    message: "Postal code is required",
  }),
  city: z.string().min(1, {
    message: "City is required",
  }),
  country: z.string().min(1, {
    message: "Country is required",
  }),
});
