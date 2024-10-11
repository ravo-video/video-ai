'use client';

import { UploadIcon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

import { useGlobalStore } from '@/store';

export function UploadDropArea() {
  const addUploads = useGlobalStore(state => state.addUploads);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'video/mp4': ['.mp4'],
    },
    onDrop: addUploads,
    multiple: false,
    maxSize: 524_288_000, // 500mb
  });

  return (
    <>
      <label
        htmlFor="files"
        className="flex h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed bg-zinc-50 p-4 text-sm text-zinc-600 hover:bg-zinc-100 data-[drag-active=true]:border-primary data-[drag-active=true]:bg-primary dark:bg-zinc-900 dark:text-zinc-400"
        data-drag-active={isDragActive}
        {...getRootProps()}>
        <UploadIcon className="size-6" />
        <div className="flex flex-col gap-1 text-center">
          <span className="font-medium">Drop videos here</span>
          <span className="text-xs text-zinc-400">Accept only MP4.</span>
        </div>
      </label>

      <input type="file" id="files" multiple {...getInputProps()} />
    </>
  );
}
