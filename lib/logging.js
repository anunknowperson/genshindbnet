import { Client, GatewayIntentBits, Events } from "discord.js";

var ready = false;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.login('MTA2NDg3NjQ3Mjg3NzE5MTE2OA.GaWoNq.dyJnGNQw7AxzFSVvaWP30bpGAwL3ZyyfM-rJ70');

client.once(Events.ClientReady, c => {
  ready = true;
});

export default async function log(message) {
  console.log(message);

  await until(_ => ready);

  client.channels.cache.get('1064878078188322908').send(message);
}

function until(conditionFunction) {

  const poll = resolve => {
    if (conditionFunction()) resolve();
    else setTimeout(_ => poll(resolve), 400);
  }

  return new Promise(poll);
}