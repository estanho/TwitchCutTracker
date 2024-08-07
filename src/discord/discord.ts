import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import { prefix, channelId } from "./config.json";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  if (message.content.startsWith(prefix + "hello")) {
    message.reply("Hello :D");
  }
});

client.once("ready", () => {
  console.log("🟢 Bot is online!");
  sendMessage("Olá, mundo! Estou online e pronto para funcionar!");
});

async function sendMessage(messageContent: string) {
  try {
    const channel = await client.channels.fetch(channelId);

    if (channel && channel.isTextBased()) {
      const textChannel = channel as TextChannel;
      const message = await textChannel.send(messageContent);

      console.log(`Message sent: ${message.content}`);
    } else {
      console.error("Channel not found or is not a text channel.");
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

client.login(process.env.DISCORD_KEY);
