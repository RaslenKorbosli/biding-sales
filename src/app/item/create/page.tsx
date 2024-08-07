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
      {/* <form
        action={addBid}
        className="flex flex-col border b-8 rounded-sm p-4 space-y-3 max-w-lg my-8"
      >
        <Input
          required
          type="text"
          name="name"
          className="max-w-lg"
          placeholder="name your item"
        />
        <Input
          required
          type="number"
          name="startingPrice"
          step={0.01}
          className="max-w-lg"
          placeholder="starting price for your auction"
        />
        <Input type="hidden" value={session.user.id as string} name="userId" />
        <Input name="file" type="file" />
        <Button type="submit" className="self-end">
          Add Item
        </Button>
      </form> */}
    </main>
  );
}
