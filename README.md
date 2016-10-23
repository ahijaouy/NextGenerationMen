# NextGenerationMen- Epic Intentions Readme

##Cloning instructions
  - `cd` to where you want to store the project
  - `git clone https://github.gatech.edu/ahijaouy3/NextGenerationMen`
  - `cd NextGenerationMen`
  - `npm install`
  - install/confirm db instance
  
##How to use
  - type `nodejs server.js` to run non-persistent test
  - confirm db activity with `idk_yet_lol`
  - navigate to `localhost:80` on `HTTP` to view project (replace `localhost` with external AWS IP if needed)

##Action Items
  - Replace `cassandra-store` with db choice's store for login cookie persistence
  - Integrate static website

##To use PM2 (our choice for persistence management)
  In project root, run `pm2 start server.js --watch --name="ngm" -i ##`, where `##` is the number of node instances needed (this will load balance requests, and auto restart the server on file changes)
  - `pm2 ls` shows all processes started through `pm2`
  - `pm2 delete ngm` will end all instances of the `ngm` process
  - `pm2 kill` will stop the `pm2` deamon
  - `pm2 flush` will flush all logs
  - `pm2 logs` will start a stream with all log output
