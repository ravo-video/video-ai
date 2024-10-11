import { TranscriberData } from '@repo/whisper';
import { useEffect, useRef } from 'react';

interface Props {
  transcribedData: TranscriberData | undefined;
}

export default function Transcript({ transcribedData }: Props) {
  const divRef = useRef<HTMLDivElement>(null);

  const saveBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };
  const exportTXT = () => {
    let chunks = transcribedData?.chunks ?? [];
    let text = chunks
      .map(chunk => chunk.text)
      .join('')
      .trim();

    const blob = new Blob([text], { type: 'text/plain' });
    saveBlob(blob, 'transcript.txt');
  };
  const exportJSON = () => {
    let jsonData = JSON.stringify(transcribedData?.chunks ?? [], null, 2);

    // post-process the JSON to make it more readable
    const regex = /(    "timestamp": )\[\s+(\S+)\s+(\S+)\s+\]/gm;
    jsonData = jsonData.replace(regex, '$1[$2 $3]');

    const blob = new Blob([jsonData], { type: 'application/json' });
    saveBlob(blob, 'transcript.json');
  };

  // Scroll to the bottom when the component updates
  useEffect(() => {
    if (divRef.current) {
      const diff = Math.abs(
        divRef.current.offsetHeight +
          divRef.current.scrollTop -
          divRef.current.scrollHeight,
      );

      if (diff <= 64) {
        // We're close enough to the bottom, so scroll to the bottom
        divRef.current.scrollTop = divRef.current.scrollHeight;
      }
    }
  });

  return (
    <div
      ref={divRef}
      className="my-2 flex max-h-[20rem] w-full flex-col overflow-y-auto p-4">
      {transcribedData?.chunks &&
        transcribedData.chunks.map((chunk, i) => (
          <div
            key={`${i}-${chunk.text}`}
            className="mb-2 flex w-full flex-row rounded-lg bg-white p-4 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
            <div className="mr-5">
              {formatAudioTimestamp(chunk.timestamp[0])}
            </div>
            {chunk.text}
          </div>
        ))}
      {transcribedData && !transcribedData.isBusy && (
        <div className="w-full text-right">
          <button
            onClick={exportTXT}
            className="mr-2 inline-flex items-center rounded-lg bg-green-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-600 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Export TXT
          </button>
          <button
            onClick={exportJSON}
            className="mr-2 inline-flex items-center rounded-lg bg-green-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-600 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Export JSON
          </button>
        </div>
      )}
    </div>
  );
}

function padTime(time: number) {
  return String(time).padStart(2, '0');
}

export function formatAudioTimestamp(time: number) {
  const hours = (time / (60 * 60)) | 0;
  time -= hours * (60 * 60);
  const minutes = (time / 60) | 0;
  time -= minutes * 60;
  const seconds = time | 0;
  return `${hours ? padTime(hours) + ':' : ''}${padTime(minutes)}:${padTime(
    seconds,
  )}`;
}
