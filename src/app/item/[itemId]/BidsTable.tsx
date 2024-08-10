import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { bid, item } from '@/db/schema';

import { formatDistance } from 'date-fns';
export default function BidsTable({ allBids }: { allBids: bid[] }) {
  return (
    <Table className=" flex-1 text-center">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Bid value</TableHead>
          <TableHead className="text-center">Bider</TableHead>
          <TableHead className="text-center">bid created </TableHead>
        </TableRow>
      </TableHeader>
      {allBids.map((bid) => {
        return (
          <TableBody key={bid.id}>
            <TableRow>
              <TableCell className="font-medium">{bid.bidValue} $</TableCell>
              <TableCell> {bid.userName}</TableCell>
              <TableCell>
                {formatDistance(bid.bidCreatedAt as Date, new Date(), {
                  addSuffix: true,
                })}
              </TableCell>
            </TableRow>
          </TableBody>
        );
      })}
    </Table>
  );
}
