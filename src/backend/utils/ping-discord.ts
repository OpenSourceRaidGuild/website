export const sendToDiscord = async (message: string) => {
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
