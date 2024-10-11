'use client';

import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { useWhisper } from '@repo/whisper';
import { useRef } from 'react';

import { AudioManager } from './audio-manager';
import Transcript from './transcript';

export default function HomePage() {
  const input = useRef<HTMLInputElement>(null);

  const whisper = useWhisper();

  return (
    <main className="flex w-full flex-col items-center space-y-8">
      <Input ref={input} placeholder="Enter text here" />

      <Button className="mx-auto" onClick={() => {}}>
        Iniciar
      </Button>

      <AudioManager transcriber={whisper} />

      <Transcript transcribedData={whisper.output} />
    </main>
  );
}
