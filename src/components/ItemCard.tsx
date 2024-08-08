import type { item } from '@/db/schema';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
export default function ItemCard({ item }: { item: item }) {
  console.log(item.fileUrl, item.name);
  return (
    <div
      key={item.id}
      className=" text-xl border b-8 px-6 py-8 rounded-xl flex flex-col gap-2 justify-between hover:shadow-md transition-all"
    >
      <div className="relative h-[300px]">
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
        <h2 className="text-3xl font-semibold">{item.name}</h2>
        <p className="mt-4">StartingPrice : {item.startingPrice} $</p>
      </div>
      <Link href={`/item/${item.id}`}>
        <Button variant="default">Bid on item</Button>
      </Link>
    </div>
  );
}
