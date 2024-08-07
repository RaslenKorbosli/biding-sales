import { items } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import Image from 'next/image';
export default function ItemCard({
  item,
}: {
  item: InferSelectModel<typeof items>;
}) {
  console.log(item.fileUrl, item.name);
  return (
    <div
      key={item.id}
      className="border b-8 p-4 rounded-xl flex flex-col gap-2"
    >
      <h3>{item.name}</h3>

      <Image
        src={item.fileUrl}
        width={500}
        height={500}
        className="aspect-square"
        alt={`${item.name} file icon`}
      />

      <span>{item.startingPrice}</span>
    </div>
  );
}
