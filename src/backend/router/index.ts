import { ContactFormValidator } from "@/shared/contact-form";
import * as trpc from "@trpc/server";
import { sendToDiscord } from "../utils/ping-discord";

export const appRouter = trpc.router().mutation("contact-form", {
  input: ContactFormValidator,
  async resolve({ input }) {
    const content = `**NEW CONTACT**\n\n**Email:** ${input.email}\n**Name:** ${input.name}\n**Role:** ${input.role}\n**Message**: ${input.message}\n\n`;
    return await sendToDiscord(content);
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;
