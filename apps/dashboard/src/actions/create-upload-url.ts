'use server';

import { requestVideoUploadUrl } from '@repo/cloudflare';
import { z } from 'zod';
import { createServerAction } from 'zsa';

export const createUploadUrl = createServerAction()
  .input(z.object({ videoId: z.string() }))
  .handler(async ({ input: { videoId } }) => {
    return requestVideoUploadUrl(videoId);
  });
