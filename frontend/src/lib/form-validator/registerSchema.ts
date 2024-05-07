import { z } from "zod";

const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*\W)/;
export const registerSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username is too short",
    })
    .max(50, {
      message: "Username is too long",
    })
    .nonempty({
      message: "Username is required",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password is too short",
    })
    .max(50, {
      message: "Password is too long",
    })
    .regex(passwordRegex, {
      message:
        "Password must contain at least one uppercase letter, one number, and one special character",
    }),
  email: z.string().email({
    message: "Invalid email",
  }),
  firstname: z.string().min(1, {
    message: "Firstname is required",
  }),
  lastname: z.string().min(1, {
    message: "Lastname is required",
  }),
});
