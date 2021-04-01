import { Sequelize } from 'sequelize-typescript';
import Umzug = require('umzug');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: { sequelize },
  logging: false,
  migrations: {
    params: [
      sequelize,
      sequelize.constructor,
    ],

    // folder containing the migration files
    path: './src/migrations',
    pattern: /\.ts$/,
  },
});

// To Run migrations: npm run migrate up

const task = (process.argv[2] || '').trim();

switch (task) {
  case 'up':
    // checks migrations and run them if they are not already applied
    umzug.up()
      .then((result) => {
        console.log('All migrations up performed successfully!', result);
        process.exit(0);
      });
    break;
  case 'down':
    umzug.down()
      .then((result) => {
        console.log('All migrations down performed successful!', result);
        process.exit(0);
      });
    break;
  default:
    break;
};