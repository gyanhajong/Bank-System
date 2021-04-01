import { Sequelize } from 'sequelize-typescript';

/*
    Create and export sequelize instance that helps to connect to database
*/

export const databaseProvider = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
        const sequelize = new Sequelize({
            dialect: 'postgres',
            host: "",
            port: 5432,
            username: "",
            password: "",
            database: ""
        });
        sequelize.addModels([]);
        return sequelize;
        }
  }
]