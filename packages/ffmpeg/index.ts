import { writeFile } from 'node:fs/promises';
import { join, parse } from 'node:path';

import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import fffmpeg from 'fluent-ffmpeg';

type OnProgressCallback = Parameters<FFmpeg['on']>[1];

export let ffmpeg: FFmpeg | null = null;

export async function convertVideoToMP3(
  inputFile: File,
  onProgress: (progress: number) => void,
): Promise<File> {
  ffmpeg = new FFmpeg();

  if (!ffmpeg.loaded) {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        'application/wasm',
      ),
    });
  }

  ffmpeg.writeFile(inputFile.name, await fetchFile(inputFile));

  const onFFMpegProgress: OnProgressCallback = ({ progress }) => {
    const progressPercentage = Math.round(progress * 100);

    onProgress(progressPercentage);
  };

  ffmpeg.on('progress', onFFMpegProgress);

  const outputId = crypto.randomUUID();

  await ffmpeg.exec([
    '-i',
    inputFile.name,
    '-vn',
    '-b:a',
    '20k',
    '-acodec',
    'libmp3lame',
    `${outputId}.mp3`,
  ]);

  const data = (await ffmpeg.readFile(`${outputId}.mp3`)) as Uint8Array;

  const audioFileBlob = new Blob([data.buffer], { type: 'audio/mpeg' });

  const audioFile = new File([audioFileBlob], `${outputId}.mp3`, {
    type: 'audio/mpeg',
  });

  ffmpeg.off('progress', onFFMpegProgress);

  return audioFile;
}

export async function convertVideoToWaveOnServer(
  inputFile: File,
  workDir: string,
): Promise<{ audioPath: string; videoPath: string }> {
  const command = fffmpeg();

  const outputId = crypto.randomUUID();

  const videoPath = join(workDir, `${outputId}${parse(inputFile.name).ext}`);

  await writeFile(videoPath, (await inputFile.stream()) as any);

  const audioPath = join(workDir, `${outputId}.wav`);

  return new Promise((resolve, reject) => {
    command
      .input(videoPath)
      .output(audioPath)
      .on('error', reject)
      .on('end', () => {
        resolve({ audioPath, videoPath });
      })
      .run();
  });
}
