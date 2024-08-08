import { auth } from '@/auth';
import ItemCard from '@/components/ItemCard';
import { Button } from '@/components/ui/button';
import { UploadItemForm } from '@/components/UploadItemForm';
import { database } from '@/db/database';
import { items } from '@/db/schema';
import Image from 'next/image';
import Link from 'next/link';

export default async function AuctionPage() {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');
  // const { startUpload } = useUploadThing('imageUploader');
  const auctionItems = (await database.select().from(items)).filter(
    (item) => item.userId === session.user?.id
  );
  console.log(auctionItems);
  return (
    <main className="container py-12 mx-auto px-4">
      <h2 className="text-4xl font-semibold mb-8"> My auction items </h2>

      {auctionItems.length === 0 ? (
        <div className="container flex justify-center items-center  flex-col gap-4 ">
          <Image
            alt="no data logo"
            width={350}
            height={350}
            src="/noData.svg"
            className="mt-20"
          />
          <h1 className="text-2xl mt-2 max-w-prose ">
            You have no auction items yet , please add one
          </h1>

          <Link href="/item/create">
            <Button variant="default">Add auction item</Button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {auctionItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </main>
  );
}
