import { signIn } from '@/auth';
import { Button } from './ui/button';

export default async function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google', { redirectTo: '/auctions' });
      }}
    >
      <Button type="submit"> Sign In</Button>
    </form>
  );
}
