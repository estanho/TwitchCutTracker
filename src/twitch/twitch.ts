import { ApiClient } from "@twurple/api";
import { RefreshingAuthProvider } from "@twurple/auth";
import type { AccessToken as tokenType } from "@twurple/auth";
import { ChatClient } from "@twurple/chat";
import { promises as fs } from "fs";

const clientId = process.env.TWITCH_APP_CLIENT_ID;
const clientSecret = process.env.TWITCH_APP_CLIENT_SECRET;

async function loadTokenData() {
  try {
    const tokenData = JSON.parse(
      await fs.readFile("./src/twitch/token.json", "utf-8"),
    );
    return tokenData;
  } catch (error) {
    console.error("Error reading token data:", error);
  }
}

async function saveTokenData(_: string, tokenData: tokenType) {
  try {
    await fs.writeFile(
      `./token.json`,
      JSON.stringify(tokenData, null, 4),
      "utf-8",
    );
  } catch (error) {
    console.error("Error writing token data:", error);
  }
}

async function main() {
  const tokenData = await loadTokenData();

  const authProvider = new RefreshingAuthProvider({
    clientId,
    clientSecret,
  });

  authProvider.onRefresh(async (userId, newTokenData) => {
    await saveTokenData(userId, newTokenData);
  });

  await authProvider.addUserForToken(tokenData, ["chat"]);

  const apiClient = new ApiClient({ authProvider });

  const chatClient = new ChatClient({
    authProvider,
    channels: ["choke7"],
  });

  chatClient.onMessage(async (channel, user, text) => {
    console.log(`[${channel}][${user}]: ${text}`);
    if (text === "!teste") {
      console.log(`Comando recebido de ${user} às ${new Date()}`);
      try {
        const userInfo = await apiClient.users.getUserByName(user);
        if (userInfo) {
          console.log(
            `User ID: ${userInfo.id}, Display Name: ${userInfo.displayName}`,
          );
          // Salvar as informações ou realizar outras ações aqui
        } else {
          console.log(`Usuário ${user} não encontrado.`);
        }
      } catch (error) {
        console.error("Erro ao consultar a API Helix:", error);
      }
    }
  });

  chatClient.connect();
}

main().catch(console.error);
