import { auth } from '@/auth';
import SignIn from '@/components/SignIn';
import SignOut from '@/components/SignOut';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { database } from '@/db/database';
import { addBid } from '@/server/addBid';
import { Session } from 'next-auth';

export default async function CreateBids() {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');

  return (
    <main className="container py-12 mx-auto">
      <h1 className="text-4xl font-bold ">Post An Item </h1>
      <form
        action={addBid}
        className="flex flex-col border b-8 rounded-sm p-4 space-y-3 max-w-lg my-8"
      >
        <Input
          required
          type="text"
          name="name"
          className="max-w-lg"
          placeholder="name your item"
        />
        <Input
          required
          type="number"
          name="startingPrice"
          step={0.01}
          className="max-w-lg"
          placeholder="starting price for your auction"
        />
        <Input type="hidden" value={session.user.id as string} name="userId" />
        <Button type="submit" className="self-end">
          Add Item
        </Button>
      </form>
    </main>
  );
}
