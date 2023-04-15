import { Client } from 'pg';

export const pgClient = new Client(
  'postgres://admin:gDNgo8XEt3zBVGXFvQ8sxdw5zDSAfdi9@dpg-cgt68vqut4mcfrkbisu0-a.oregon-postgres.render.com/sql_express_app?ssl=true'
);
