import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { Label } from '@/components/ui/label';
import { item } from '@/db/schema';
import Image from 'next/image';
import { addBid } from '../actions';
export default function BidCard({
  item,
  userName,
}: {
  item: item;
  userName: string;
}) {
  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Add your bid</CardTitle>
        <CardDescription>Add your bid to to the {item.name}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-6 ">
        <Image
          src={item.fileUrl}
          width={300}
          height={300}
          className="object-cover aspect-square shadow-sm rounded-lg"
          alt={`${item.name} file icon`}
        />
        <div>
          <div className="text-md my-6">
            <p>
              Starting Price{' '}
              <span className="font-semibold"> {item.startingPrice} $</span>
            </p>
            <p>
              Total price{' '}
              <span className="font-semibold"> {item.totalPrice} $</span>{' '}
            </p>
          </div>
          <form action={addBid} className="space-y-2 w-96 ">
            <Label>the bid interval is between 1$ and 10$</Label>
            <Input
              type="number"
              name="bidValue"
              placeholder="Set your bid"
              className="width-fit"
              required
              pattern="[1-9]|10"
              min={1}
              max={10}
            />
            <Input type="hidden" name="userName" value={userName} />
            <Input type="hidden" name="itemId" value={item.id} />
            <Button type="submit" className="">
              start biding
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
