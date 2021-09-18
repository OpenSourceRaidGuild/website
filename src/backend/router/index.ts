import { ContactFormValidator } from "@/shared/contact-form";
import { sendToDiscord } from "@/backend/utils/ping-discord";
import { createProtectedRouter } from "@/backend/router/create-protected-router";

// Primary api for interacting with "server side"
// Read more: https://trpc.io
export const appRouter = createProtectedRouter().mutation("contact-form", {
  input: ContactFormValidator,
  async resolve({ input, ctx }) {
    const content = `**NEW CONTACT**\n\n**Email:** ${input.email}\n**Name:** ${ctx.session.user?.name}\n**Role:** ${input.role}\n**Message**: ${input.message}\n\n`;
    return await sendToDiscord(content);
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;
