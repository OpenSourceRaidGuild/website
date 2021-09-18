import { ContactFormValidator } from "@/shared/contact-form";
import { createProtectedRouter } from "@/backend/router/create-protected-router";
import { submitContactForm } from "./d/contact-form-submit";

// Protected router for contact form. Requires auth to proceed
export const contactFormRouter = createProtectedRouter().mutation(
  "submit-form",
  {
    input: ContactFormValidator,
    async resolve({ input, ctx }) {
      return await submitContactForm(input, ctx.session.userId);
    },
  }
);
