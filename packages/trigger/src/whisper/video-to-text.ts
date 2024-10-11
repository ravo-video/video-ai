import { logger, task } from '@trigger.dev/sdk/v3';
import whisper from 'whisper-node';

type Payload = {};

export const videoToTextTask = task({
  id: 'video-to-text',
  queue: {
    concurrencyLimit: 1,
  },
  run: async (payload: Payload, { ctx }) => {
    logger.log('Hello, world!', { payload, ctx });

    whisper();

    return {
      message: 'Hello, world!',
    };
  },
  async cleanup() {},
});
