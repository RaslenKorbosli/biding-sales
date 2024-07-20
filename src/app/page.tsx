import { auth } from '@/auth';
import SignIn from '@/components/SignIn';
import SignOut from '@/components/SignOut';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { database } from '@/db/database';
import { addBid } from '@/server/addBid';
import { Session } from 'next-auth';
import Link from 'next/link';

export default async function Home() {
  const session = await auth();
  if (!session) return null;
  if (!session.user) return null;
  const allItemsData = await database.query.items.findMany();
  return (
    <main className="container py-12 mx-auto px-4">
      <h2 className="text-4xl font-semibold"> Items For Sale</h2>

      <div className="grid grid-cols-4 gap-2 ">
        {allItemsData.map((item) => (
          <div
            key={item.id}
            className="border b-8 p-4 rounded-xl flex flex-col gap-2"
          >
            <h3>{item.name}</h3>
            <span>{item.startingPrice}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
