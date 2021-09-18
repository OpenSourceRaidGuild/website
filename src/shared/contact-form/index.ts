import { z } from "zod";

export const ContactFormValidator = z.object({
  email: z.string().email(),
  role: z.enum(["Maintainer", "Contributor", "Guild Member", "Other"]),
  message: z.string().min(5).max(5000),

  repoUrl: z.string().url().nullable(),
});

export type ContactFormValidatorType = z.infer<typeof ContactFormValidator>;
