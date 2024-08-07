import { exchangeCode } from "@twurple/auth";

const clientId = process.env.TWITCH_APP_CLIENT_ID;
const clientSecret = process.env.TWITCH_APP_CLIENT_SECRET;

async function main() {
  const code = process.env.TWITCH_CODE_TOKEN; // get it from wherever
  const redirectUri = "http://localhost"; // must match one of the URLs in the dev console exactly
  const tokenData = await exchangeCode(
    clientId,
    clientSecret,
    code,
    redirectUri,
  );

  console.log(JSON.stringify(tokenData));
}

main();
