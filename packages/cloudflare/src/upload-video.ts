import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from '@repo/env';

import { r2 } from '../r2';

export async function requestVideoUploadUrl(videoId: string) {
  const url = await getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: env.CLOUDFLARE_UPLOAD_BUCKET_NAME,
      Key: `${videoId}.mp4`,
      ContentType: 'video/mp4',
    }),
    { expiresIn: 60 * 10 /** 10m **/ },
  );

  return { url };
}
