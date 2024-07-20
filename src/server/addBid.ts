'use server';
import { revalidatePath } from 'next/cache';
import { database } from '@/db/database';
import { items } from '@/db/schema';
export async function addBid(formData: FormData) {
  await database
    .insert(items)
    .values({
      name: formData.get('name') as string,
      userId: formData.get('userId') as string,
    });
  revalidatePath('/');
}
