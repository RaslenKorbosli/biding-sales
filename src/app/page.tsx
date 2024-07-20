import { auth } from '@/auth';
import SignIn from '@/components/SignIn';
import SignOut from '@/components/SignOut';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { database } from '@/db/database';
import { addBid } from '@/server/addBid';
import { Session } from 'next-auth';

export default async function Home() {
  const session = await auth();
  if (!session) return null;
  const erg = 5;
  if (!session.user) return null;
  const allItemsData = await database.query.items.findMany();
  console.log(allItemsData);
  return (
    <main className="container py-12 mx-auto">
      <form action={addBid}>
        <div className=" flex">
          <Input type="text" name="name" placeholder="name your item" />
          <Input
            type="hidden"
            value={session.user.id as string}
            name="userId"
          />
          <Button type="submit">Add Item</Button>
        </div>
      </form>
      {!session ? <SignIn /> : <SignOut />}

      {allItemsData.map((bid) => (
        <div key={bid.id}>{bid.name}</div>
      ))}
    </main>
  );
}
