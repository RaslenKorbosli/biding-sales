import Image from 'next/image';
import SignIn from './SignIn';
import SignOut from './SignOut';
import { auth } from '@/auth';
import Link from 'next/link';
import { Hammer, TagsIcon } from 'lucide-react';

export default async function Header() {
  const session = await auth();
  // if (!session) return null;
  // if (!session.user) return null;
  return (
    <div className=" bg-gray-100 p-4">
      <div className="container flex justify-between items-center mx-auto ">
        <Link href="/" className="flex items-center gap-2 hover:underline">
          <Image src="/logo.png" width={50} height={50} alt="logo image" />
          <h1>bidingSales.com</h1>
        </Link>
        <Link
          href="/item/create"
          className="flex items-center gap-2 hover:underline"
        >
          <Hammer />
          <h1 className="capitalize">auction an item</h1>
        </Link>
        <div className="flex items-center gap-2">
          {session?.user?.name}
          {!session ? <SignIn /> : <SignOut />}
        </div>
      </div>
    </div>
  );
}
