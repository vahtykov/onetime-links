import 'dotenv/config';

import { Sequelize } from 'sequelize-typescript';
import { Link } from './entities/link.entity';
import { SEQUELIZE } from './constants';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      sequelize.addModels([Link]);

      return sequelize;
    },
  },
];
