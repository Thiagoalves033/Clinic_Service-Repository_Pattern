import { DatabasePool, createPool } from 'slonik';

export async function getDatabasePool(): Promise<DatabasePool> {
  return await createPool(
    `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`
  );
}
