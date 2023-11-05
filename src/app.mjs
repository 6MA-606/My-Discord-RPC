import DiscordRPC from 'discord-rpc'
import { configDotenv } from 'dotenv'

configDotenv()

const { CLIENT_ID } = process.env

const RPC = new DiscordRPC.Client({ transport: 'ipc' })

DiscordRPC.register(CLIENT_ID)

async function setActivity() {
  if (!RPC) return
  RPC.setActivity({
    details: 'Coding',
    state: 'Making a Discord RPC app',
    startTimestamp: new Date(),
    largeImageKey: 'reallife',
    largeImageText: 'Real life',
    smallImageKey: 'reallife',
    smallImageText: 'Real life',
    instance: false,
    buttons: [
      { label: 'GitHub', url: 'https://github.com/6MA-606' },
      { label: 'Instagram', url: 'https://www.instagram.com/sittha.m_' },
    ],
  })
}

RPC.on('ready', async () => {
  await setActivity()
  console.log('Discord RPC is ready')

  setInterval(async () => {
    await setActivity()
  }, 15e3)
})

RPC.login({ clientId: CLIENT_ID }).catch(console.error)
