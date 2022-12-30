# Welcome to Ticket Booking Service

### Database creation

- Initilize sequelize
  - run`yarn sequelize init`
- Creates 4 files, in config.json put database name and password
- Create database
  - run `yarn sequelize db:create`
- Create booking table
  - run ` yarn sequelize model:generate --name Booking --attributes flightId:integer,userId:integer,status:enum`
- Migrate DB
  - run ` yarn sequelize db:migrate`
- Update booking table

  - run ` yarn sequelize migration:create --name modify_booking`
  - add column in the table using `model name` and `new column name`
  - This is how the two columns(noOfSeats & totalCost) are added in Bookings table:

  ```
    await queryInterface.addColumn('Bookings', 'noOfSeats',
    {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    });
    await queryInterface.addColumn('Bookings', 'totalCost',
    {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
  ```

  - Migrate db again by running `yarn sequelize db:migrate` and the columns will be added in Bookings table

  ##### OR

- Update booking table

  - Add columns(noOfSeats & totalCost) fields in the `Booking` model
  - Sync DB and the columns will be added in Bookings table

  ```
      const db = require('./models/index');

      if(process.env.DB_SYNC) {
          db.sequelize.sync({alter: true});
      }
  ```
