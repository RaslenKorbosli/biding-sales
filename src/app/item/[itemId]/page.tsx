import { auth } from '@/auth';
import { Button } from '@/components/ui/button';

import { database } from '@/db/database';
import { bids, items } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import BidsTable from './BidsTable';
import BidCard from './BidCard';
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
  // const allBids = (
  //   await database.select().from(bids).orderBy(desc(bids.bidCreatedAt))
  // ).filter((bid) => bid.itemId == itemId);
  const allBids = await database.query.bids.findMany({
    where: eq(bids.itemId, itemId),
    orderBy: desc(bids.bidCreatedAt),
    with: { user: true },
  });

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
    <div className=" text-xl px-6   container mt-20  mx-auto">
      <h2 className="text-3xl mb-8">
        Auction for{' '}
        <span className="font-semibold">
          <span>{item.name}</span>
        </span>
      </h2>
      <div className="flex flex-col gap-4 transition-all justify-center items-center ">
        <BidCard item={item} userName={session.user.name!} />
        <BidsTable allBids={allBids} />
      </div>
    </div>
  );
}
