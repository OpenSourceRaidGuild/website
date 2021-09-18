import { ContactFormValidator } from "@/shared/contact-form";
import * as trpc from "@trpc/server";
import { z } from "zod";
import { sendToDiscord } from "../utils/ping-discord";

export const appRouter = trpc
  .router()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      };
    },
  })
  .mutation("contact-form", {
    input: ContactFormValidator,
    async resolve({ input }) {
      const content = `**NEW CONTACT**\n\n**Email:** ${input.email}\n**Name:** ${input.name}\n**Role:** ${input.role}\n**Message**: ${input.message}\n\n`;
      return await sendToDiscord(content);
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
