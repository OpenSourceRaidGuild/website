export const sendToDiscord = async (message: string) => {
  const req = await fetch(
    "https://discord.com/api/webhooks/888615431617785876/nNcSPs4yZZVqaGc-ohEO0Hw55tqMt7ywntb6R6AOzZfSylw7O2TeGk7lXhMDecKBbPjZ",
    {
      method: "POST",
      body: JSON.stringify({
        content: message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return req;
};
