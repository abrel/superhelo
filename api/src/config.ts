import { config } from 'dotenv';

if (!process.env.ENV) {
  config();
}

export {};
