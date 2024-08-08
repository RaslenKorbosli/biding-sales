import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  differenceInDays,
  format,
  formatDistance,
  formatRelative,
  subDays,
} from 'date-fns';
import { database } from '@/db/database';
import { bids, items } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ArrowRight } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
export default async function page({
  params: { itemId },
}: {
  params: { itemId: number };
}) {
  const session = await auth();
  if (!session || !session.user) return null;
  const item = await database.query.items.findFirst({
    where: eq(items.id, itemId),
  });
  const allBids = await database.query.bids.findMany({
    where: eq(bids.itemId, itemId),
  });

  async function addBid(FormData: FormData) {
    'use server';
    const userName = String(FormData.get('userName'));
    const bidValue = Number(FormData.get('bidValue'));
    const date = new Date();

    await database.insert(bids).values({
      bidValue: bidValue,
      userName: userName,
      bidCreatedAt: date,
      itemId: itemId,
    });
    revalidatePath(`/item/${itemId}`);
  }

  if (!item)
    return (
      <div className="text-4xl font-semibold text-center mt-20 flex justify-center items-center flex-col gap-4 ">
        <Image
          alt="no data logo"
          width={350}
          height={350}
          src="/noData.svg"
          className="mt-20"
        />
        <h1 className="4xl">Item you looking for not found</h1>
        <Button asChild>
          <Link href="/">
            View auctions <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  return (
    <div key={item.id} className=" text-xl px-6   container mt-20 ">
      <h2 className="text-3xl mb-8">
        Auction for{' '}
        <span className="font-semibold">
          <span>{item.name}</span>
        </span>
      </h2>
      <div className="flex gap-4 transition-all">
        <div className="flex flex-col gap-2 justify-between flex-1">
          <div className="relative h-[300px] rounded-md">
            {' '}
            <Image
              src={item.fileUrl}
              width={3000}
              height={250}
              className="object-cover aspect-square absolute max-h-[300px] shadow-sm"
              alt={`${item.name} file icon`}
            />
          </div>

          <div className="">
            <p className="mt-4">
              StartingPrice of
              <span className="font-semibold"> {item.startingPrice}$</span>{' '}
            </p>
          </div>
          <div>
            {' '}
            <form action={addBid}>
              <Input type="number" name="bidValue" placeholder="Set your bid" />
              <Input type="hidden" name="userName" value={session.user.name!} />
              <Button type="submit"> start bid</Button>
            </form>
          </div>
        </div>

        <div className="bg-slate-50 flex-1">
          {allBids.map((bid) => {
            const daysSince = differenceInDays(
              new Date(),
              bid.bidCreatedAt as Date
            );
            return (
              <div key={bid.id}>
                {bid.bidValue}$ by {bid.userName}{' '}
                {formatDistance(
                  subDays(new Date(), daysSince),
                  bid.bidCreatedAt as Date,
                  {
                    addSuffix: true,
                  }
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
