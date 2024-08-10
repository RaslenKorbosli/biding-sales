'use server';
import { auth } from '@/auth';
import { database } from '@/db/database';
import { bids, items } from '@/db/schema';
import { DrizzleError, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function addItem(
  name: string,
  startingPrice: number,
  userId: string,
  fileUrl: string
) {
  await database.insert(items).values({
    name,
    startingPrice,
    totalPrice: startingPrice,
    userId,
    fileUrl,
  });
}

export async function addBid(FormData: FormData) {
  const session = await auth();
  if (!session || !session.user)
    throw new DrizzleError({
      cause: session,
      message: 'You must be logged in',
    });
  const userName = String(FormData.get('userName'));
  const bidValue = Number(FormData.get('bidValue'));
  const itemId = Number(FormData.get('itemId'));
  const date = new Date();

  await database.insert(bids).values({
    bidValue: bidValue,
    userName: userName,
    bidCreatedAt: date,
    itemId: itemId,
    userId: session.user.id!,
  });
  const currentItem = await database.query.items.findFirst({
    where: eq(items.id, itemId),
  });
  if (!currentItem)
    throw new DrizzleError({
      cause: items,
      message: 'Item not found !',
    });
  await database.update(items).set({
    totalPrice: currentItem.totalPrice + bidValue,
  });
  revalidatePath(`/item/${itemId}`);
}
