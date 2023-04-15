import { readFileSync } from 'fs';

import { pgClient } from './client.config';

const seed = async () => {
  try {
    const seedQuery = readFileSync(`${__dirname}/seed.sql`).toString();
    await pgClient.query(seedQuery);
    console.log('seeding completed');
  } catch (error) {
    console.log('seeding failed');
    console.log(error);
  }
};

seed();
