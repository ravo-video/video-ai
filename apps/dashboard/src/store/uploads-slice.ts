import { Draft } from 'immer';
import { createSliceWithImmer } from 'zustand-slices/immer';

type Upload = {
  file: File;
  videoId: string;
  isRunning: boolean;
  progress: number;
  error: boolean;
};

type UploadState = {
  uploads: Upload[];
};

type UploadActions = {
  addUploads: (files: File[]) => (draft: Draft<UploadState>) => void;
};

export type UploadStore = UploadState & UploadActions;

export const createUploadsSlice = createSliceWithImmer<
  'uploads',
  UploadState,
  UploadActions
>({
  name: 'uploads',
  value: {
    uploads: [],
  },
  actions: {
    addUploads: files => state => {
      files.forEach(file => {
        const videoId = crypto.randomUUID();

        state.uploads.push({
          videoId,
          file,
          isRunning: false,
          progress: 0,
          error: false,
        });
      });
    },
  },
});
