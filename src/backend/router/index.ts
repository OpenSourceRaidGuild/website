import { ContactFormValidator } from "@/shared/contact-form";
import { sendToDiscord } from "@/backend/utils/ping-discord";
import { createProtectedRouter } from "@/backend/router/create-protected-router";
import prisma from "@/backend/clients/prisma";

// Primary api for interacting with "server side"
// Read more: https://trpc.io
export const appRouter = createProtectedRouter().mutation("contact-form", {
  input: ContactFormValidator,
  async resolve({ input, ctx }) {
    // Get user's providerAccountId from Github
    const userInfo = await prisma.account.findFirst({
      where: {
        userId: { equals: ctx.session.userId },
      },
      select: { providerAccountId: true },
    });

    if (!userInfo) throw "user not found";

    // Fetch latest info from Github
    const githubFetch = (await (
      await fetch(`https://api.github.com/user/${userInfo.providerAccountId}`)
    ).json()) as { html_url: string; login: string };

    const content = `**NEW CONTACT**\n\n**Email:** ${input.email}\n**Github:** [${githubFetch.login}](${githubFetch.html_url})\n**Name:** ${ctx.session.user?.name}\n**Role:** ${input.role}\n**Message**: ${input.message}\n\n`;
    return await sendToDiscord(content);
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;
