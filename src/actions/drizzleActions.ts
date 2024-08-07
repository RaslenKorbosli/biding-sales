'use server';
import { database } from '@/db/database';
import { items } from '@/db/schema';

export async function addItem(
  name: string,
  startingPrice: number,
  userId: string,
  fileUrl: string
) {
  await database.insert(items).values({
    name,
    startingPrice,
    userId,
    fileUrl,
  });
}
