'use server';
import { revalidatePath } from 'next/cache';
import { database } from '@/db/database';
import { items } from '@/db/schema';
import { redirect } from 'next/navigation';
export async function addBid(formData: FormData) {
  await database.insert(items).values({
    name: formData.get('name') as string,
    startingPrice: Number(formData.get('startingPrice') as string),
    userId: formData.get('userId') as string,
  });
  redirect('/');
}
