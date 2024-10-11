// import { mkdir, readdir, readFile, rm } from 'node:fs/promises';
// import { join } from 'node:path';

// import { convertVideoToWaveOnServer } from '@repo/ffmpeg';
// import { $ } from 'execa';

// export async function transcriptVideo(video: File) {
//   const workDir = getWorkDir();

//   await mkdir(workDir, { recursive: true });
//   try {
//     const { audioPath } = await convertVideoToWaveOnServer(video, workDir);
//     const transcript = await transcribe(audioPath, workDir);
//     console.log(transcript);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     rm(workDir, { force: true, recursive: true });
//   }
// }

// export async function transcribe(audioPath: string, workDir: string) {
//   await $`whisper ${audioPath} --language pt --model base --task transcribe --output_format json --output_dir ${workDir} --fp16 False`;

//   const filePath = (await readdir(workDir, { encoding: 'utf-8' })).find(path =>
//     path.includes('.json'),
//   )!;

//   const fileData = await readFile(join(workDir, filePath), {
//     encoding: 'utf-8',
//   });

//   return JSON.parse(decodeURIComponent(fileData));
// }

// function getWorkDir() {
//   const workId = crypto.randomUUID();
//   return join('/tmp', `/${workId}/`);
// }

export * from './src/hooks/use-classify';
export * from './src/hooks/use-speech';
export * from './src/hooks/use-whisper';

export * from './src/helpers/blob-fix';
export * from './src/helpers/constants';
