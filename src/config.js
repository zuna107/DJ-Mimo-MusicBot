require("dotenv").config();

module.exports = {
  token: process.env.TOKEN || '', 
  prefix: process.env.PREFIX || '.', 
  ownerID: process.env.OWNERID?.split(',') || ['948093919835590666','801043516406104155'], 
  SpotifyID: process.env.SPOTIFYID || 'SPOTIFY_ID', 
  SpotifySecret: process.env.SPOTIFYSECRET || 'SPOTIFY_CLIENT_SECRET', 
  mongourl: process.env.MONGO_URI || '', 
  embedColor: process.env.COlOR || '#6a8bf2', // 
  logs: process.env.LOGS || '', 
  links: {
    support: process.env.SUPPORT || 'https://discord.gg/WjGxK2P8Ud',
    invite: process.env.INVITE || 'https://discord.gg/WjGxK2P8Ud',
    vote: process.env.VOTE || 'https://discord.gg/WjGxK2P8Ud',
    bg: process.env.BG || 'https://media.discordapp.net/attachments/966675680907657256/967789748699668480/flat-landscape-lake-sunset-deer-wallpaper-preview.jpg'
  },

  nodes: [
    {
      url: process.env.NODE_URL || 'lava-v3.ajieblogs.eu.org:80',
      name: process.env.NODE_NAME || 'mimo',
      auth: process.env.NODE_AUTH || 'https://dsc.gg/ajidevserver',
      secure: parseBoolean(process.env.NODE_SECURE || 'false'),
    },
  ],
};

function parseBoolean(value){
    if (typeof(value) === 'string'){
        value = value.trim().toLowerCase();
    }
    switch(value){
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}
