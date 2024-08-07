import { auth } from '@/auth';
import ItemCard from '@/components/ItemCard';
import { database } from '@/db/database';

export default async function Home() {
  const session = await auth();
  if (!session) return null;
  if (!session.user) return null;
  const allItemsData = await database.query.items.findMany();

  return (
    <main className="container py-12 mx-auto px-4">
      <h2 className="text-4xl font-semibold mb-8"> Items For Sale</h2>

      <div className="grid grid-cols-4 gap-2 ">
        {allItemsData.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
