const readline = require("readline");
const config = require("./config")
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });  

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  console.log('MultiScript Started By SwadowMaster\nWhat you want to do?  ')
  rl.question(   
    " [0] Get user by id\n [1] Get guilds for a user\n [2] Leave guild from bot\n [3] List guilds\nEnter number=> ",
    async (num) => {
        if(num == 0){
            rl.question(
                "Enter the user id for get nick: ",
                async (id) => {
                    if(!id){console.log('Invalid ID'); process.exit()}
                            const user = await client.users.fetch(id).catch(console.error);
                            console.log('Username => ' + user.username + '#' + user.discriminator);
                      rl.close();
                    process.exit()
                });

        }else if (num == 1){
            rl.question(
                "Enter the user id for get guilds: ",
                async (id) => {
                    if(!id){console.log('Invalid ID'); process.exit()}
                  var servers = []
                  client.guilds.cache.forEach(async (guild) => {
                    if(guild.ownerId == id){
                    servers.push('Name=> ' + guild.name + ' ID => ' + guild.id )
                    }
                    })
                      if (servers.length) {
                        console.log('It has ' + servers.length + ' guilds')
                        console.log(servers)
                      }else{
                        console.log('Not guild found')
                      }
                    rl.close();
                    process.exit()
                });

        }else if (num == 2){
            rl.question(
                "Enter the guild id for leave: ",
                async (id) => {
                    if(!id){console.log('Invalid ID'); process.exit()}
                  let guild = client.guilds.cache.get(id)
               
                  if(!guild) {
                    console.log('I am not on this guild') 
                    process.exit()
                }
                   const user = await client.users.fetch(guild.ownerId).catch(console.error);
                    console.log('Saliendo de => ' + guild.name + ' Owner => ' + user.username + '#' + user.discriminator)
                    guild.leave()
                    rl.close();
                    process.exit()
                  });

                }else if (num == 3){ 
                    (async () => {
                        client.guilds.cache.forEach(async (guild) => {
                       console.log(`Guild=> ${guild.name} || OwnerId=> ${guild.ownerId} GuildId=> ` + guild.id)
                            })    
                            console.log('Total servers=> ' + client.guilds.cache.size)
                        process.exit()
                                      
                      })();
                }

    });
  client.login(config.token);