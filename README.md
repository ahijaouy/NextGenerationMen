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
  - Replace `cassandra-store` with db choice's store for login cookie persistence
  - Integrate static website
  - Put favicon in as `/utilities/logo.ico`
  - Create valid database login credentials in `database.js`
  - User DB ```connection.query('\
    CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
        `username` VARCHAR(20) NOT NULL, \
        `password` CHAR(60) NOT NULL, \
            PRIMARY KEY (`id`), \
        UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
        UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
    )');```

##To use PM2 (our choice for persistence management)
  In project root, run `pm2 start server.js --watch --name="ngm" -i ##`, where `##` is the number of node instances needed (this will load balance requests, and auto restart the server on file changes)
  - `pm2 ls` shows all processes started through `pm2`
  - `pm2 delete ngm` will end all instances of the `ngm` process
  - `pm2 kill` will stop the `pm2` deamon
  - `pm2 flush` will flush all logs
  - `pm2 logs` will start a stream with all log output
