import { ContactFormValidatorType } from "@/shared/contact-form";
import prisma from "@/backend/clients/prisma";

export const submitContactForm = async (
  input: ContactFormValidatorType,
  userId: string
) => {
  // Get user's providerAccountId from Github
  const userInfo = await prisma.account.findFirst({
    where: {
      userId: { equals: userId },
    },
    select: { providerAccountId: true },
  });

  if (!userInfo) throw "user not found";

  // Fetch latest info from Github
  const githubFetch = (await (
    await fetch(`https://api.github.com/user/${userInfo.providerAccountId}`)
  ).json()) as { html_url: string; login: string; name: string };

  const content = `**Github:** [${githubFetch.login}](${githubFetch.html_url})\n**Name:** ${githubFetch?.name}\n**Role:** ${input.role}\n**Message**: ${input.message}\n**Email:** ${input.email}\n\n`;
  return await sendToDiscord(content);
};

const sendToDiscord = async (message: string) => {
  const req = await fetch(process.env.DISCORD_WEBHOOK as string, {
    method: "POST",
    body: JSON.stringify({
      content: message,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return req;
};
