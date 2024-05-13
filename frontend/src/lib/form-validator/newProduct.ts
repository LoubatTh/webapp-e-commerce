import { z } from "zod";

export const newProductSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z
    .string()
    .min(1, {
      message: "Description is required",
    })
    .max(100, {
      message: "Description is too long",
    }),
  price: z.preprocess(
    (arg) => {
      if (typeof arg === "string") {
        return parseFloat(arg);
      }
      return arg;
    },
    z.number().min(0.5, {
      message: "Price must be a positive integer",
    })
  ),
});
