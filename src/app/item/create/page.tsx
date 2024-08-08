import { auth } from '@/auth';
import { UploadItemForm } from '@/components/UploadItemForm';

export default async function CreateBids() {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');
  // const { startUpload } = useUploadThing('imageUploader');
  return (
    <main className="container py-12 mx-auto">
      <h1 className="text-4xl font-bold ">Post An Item </h1>
      <UploadItemForm userId={session.user.id ?? ''} />
    </main>
  );
}
