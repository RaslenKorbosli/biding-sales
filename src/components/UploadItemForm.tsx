'use client';
import { Progress } from '@/components/ui/progress';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useUploadThing } from '@/lib/uploadthing';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ClientUploadedFileData } from 'uploadthing/types';
import { addItem } from '@/app/item/actions';

const isFile = (value: unknown): value is File =>
  typeof value === 'object' &&
  value !== null &&
  'name' in value &&
  'size' in value &&
  'type' in value;
const formSchema = z.object({
  itemName: z.string().min(2, {
    message: 'item must be at least 2 characters.',
  }),
  StartingPrice: z.string(),
  file: z.custom(isFile, {
    message: 'Must be a valid file',
  }),
});
export function UploadItemForm({ userId }: { userId: string }) {
  const { startUpload } = useUploadThing('imageUploader');
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  function progressBar() {
    const interval = setInterval(() => {
      setProgress((preValue) => {
        if (preValue >= 90) {
          clearInterval(interval);
          return preValue;
        }
        return preValue + 10;
      });
      if (form.formState.isSubmitted) {
        clearInterval(interval);
        setProgress(100);
      }
    }, 1000);

    return interval;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const file = values.file as File;
    progressBar();
    const fileUploaded: ClientUploadedFileData<any>[] | undefined =
      await startUpload([file]);

    if (!fileUploaded)
      throw new Error('Upload file failed please try again later');
    await addItem(
      values.itemName,
      Number(values.StartingPrice),
      userId,
      fileUploaded[0].url
    );
    console.log(fileUploaded);
    form.reset();
    router.push('/');
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: '',
      StartingPrice: '0',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col border b-8 rounded-sm p-4 space-y-3 max-w-lg my-8"
      >
        <FormField
          control={form.control}
          name="itemName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>item</FormLabel>
              <FormControl>
                <Input placeholder="name your item" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="StartingPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>StartingPrice</FormLabel>
              <FormControl>
                <Input
                  placeholder=" starting price for your auction"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...propsField } }) => (
            <FormItem>
              <FormLabel> File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".png,.jpg"
                  {...propsField}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    onChange(file);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Progress value={progress} className="h-2" />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <span className="flex gap-2 items-center justify-center">
              {' '}
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting
            </span>
          ) : (
            'Submit'
          )}
        </Button>
      </form>
    </Form>
  );
}
