'use server';

import { zfd } from 'zod-form-data';
import { createServerAction } from 'zsa';

export const uploadFile = createServerAction()
  .input(zfd.formData({ files: zfd.repeatableOfType(zfd.file()) }))
  .handler(async ({}) => {});
