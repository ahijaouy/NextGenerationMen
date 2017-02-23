# NextGenerationMen- Epic Intentions Readme

##Cloning instructions
  - `cd` to where you want to store the project
  - `git clone https://github.com/ahijaouy/NextGenerationMen.git`
  - `cd NextGenerationMen`
  - `npm install`

##How to use
  - type `sudo nodejs server.js` to run non-persistent test
  - navigate to `localhost:80` on `HTTP` to view project (replace `localhost` with external AWS instance located at `http://ec2-35-161-110-16.us-west-2.compute.amazonaws.com/`

##Action Items
  - Integrate static website
  - Put favicon in as `/utilities/logo.ico`
  - 
  
##Update Live Server
  - SSH into server
  - git pull
  - if you need to update db. Create new db. use db. then to load DDL `source NextGenerationMen/utilities/ddl.sql;`

##To use PM2 (our choice for persistence management)
  In project root, run `pm2 start server.js --watch --name="ngm" -i ##`, where `##` is the number of node instances needed (this will load balance requests, and auto restart the server on file changes)
  - `pm2 ls` shows all processes started through `pm2`
  - `pm2 delete ngm` will end all instances of the `ngm` process
  - `pm2 kill` will stop the `pm2` deamon
  - `pm2 flush` will flush all logs
  - `pm2 logs` will start a stream with all log output
