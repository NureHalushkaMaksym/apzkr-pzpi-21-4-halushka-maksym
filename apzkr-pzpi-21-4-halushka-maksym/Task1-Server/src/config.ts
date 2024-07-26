import * as dotenv from 'dotenv';

dotenv.config();

export default () => ({
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'halushka1',
    name: process.env.DB_NAME || 'food sales',
  },
  secretKey: process.env.SECRET_KEY || 'default_secret_key',
});
