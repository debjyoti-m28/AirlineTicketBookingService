# Welcome to Ticket Booking Service

### Database creation

- Initilize sequelize
  - run`yarn sequelize init`
- Creates 4 files, in config.json put database name and password
- Create database
  - run `yarn sequelize db:create`
- Create booking table
  - run ` yarn sequelize model:generate --name Booking --attributes flightId:integer,userId:integer,status:enum`
