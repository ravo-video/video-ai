import { useEffect, useRef } from 'react';

export type AudioPlayerProps = {
  audioUrl: string;
  mimeType: string;
};

export default function AudioPlayer({ audioUrl, mimeType }: AudioPlayerProps) {
  const audioPlayer = useRef<HTMLAudioElement>(null);
  const audioSource = useRef<HTMLSourceElement>(null);

  // Updates src when url changes
  useEffect(() => {
    if (audioPlayer.current && audioSource.current) {
      audioSource.current.src = audioUrl;
      audioPlayer.current.load();
    }
  }, [audioUrl]);

  return (
    <div className="relative z-10 my-4 flex w-full">
      <audio
        ref={audioPlayer}
        controls
        className="h-14 w-full rounded-lg shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
        <source ref={audioSource} type={mimeType}></source>
      </audio>
    </div>
  );
}
