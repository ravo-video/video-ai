'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@repo/ui/components/ui/sonner';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Header } from './header';
import { UploadDropArea } from './upload-drop-area';

const uploadsFormSchema = z.object({
  files: z
    .array(
      z.object({
        id: z.string(),
        title: z.string().min(1),
        duration: z.coerce.number().transform(Math.round),
        language: z.enum(['pt', 'es']),
        sizeInBytes: z.coerce.number(),
        tags: z.array(z.string()).min(1, 'At least one tag is required.'),
      }),
    )
    .min(0),
});

export type UploadsFormSchema = z.infer<typeof uploadsFormSchema>;

export function UploadList() {
  const router = useRouter();

  const uploadsForm = useForm<UploadsFormSchema>({
    resolver: zodResolver(uploadsFormSchema),
  });

  const { handleSubmit } = uploadsForm;

  async function handleCreateUploadBatch({ files }: UploadsFormSchema) {
    try {
    } catch {
      toast.error('Uh oh! Something went wrong.', {
        description:
          'An error ocurred while trying to create the upload batch. If the error persists, please contact an administrator.',
      });
    }
  }

  return (
    <FormProvider {...uploadsForm}>
      <div className="space-y-4">
        <Header onSubmit={handleSubmit(handleCreateUploadBatch)} />
        <UploadDropArea />
        <UploadTable />
      </div>
    </FormProvider>
  );
}
