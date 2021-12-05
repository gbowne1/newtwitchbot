export const tmi = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: "",
        password: "" //OATH TOKEN RETRIEVED FROM https://twitchapps.com/tmi/
    },
    channels: [], // LIST OF CHANNELS TO JOIN ON BOT START ["#channel1", "#channel2", etc]
};
export const clientID = "";
export const oauthToken = "";
export const region = "na";
export const riotToken = "";
export const dbLink = "" // MONGODB ATLAS DATABASE LINK
    ;