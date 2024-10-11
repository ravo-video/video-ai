import { useCallback, useEffect, useRef, useState } from 'react';

type Progress = {
  name: string;
  file: string;
  progress?: number;
  status: string;
};

export function useSpeech() {
  // Model loading
  const [ready, setReady] = useState<boolean | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [progressItems, setProgressItems] = useState<Progress[]>([]);

  // Inputs and outputs
  const [selectedSpeaker, setSelectedSpeaker] = useState(
    'cmu_us_slt_arctic-wav-arctic_a0001',
  );
  const [output, setOutput] = useState<string | null>(null);

  const worker = useRef<Worker | null>(null);

  useEffect(() => {
    if (!worker.current) {
      // Create the worker if it does not yet exist.
      worker.current = new Worker(
        new URL('../workers/speech.worker.js', import.meta.url),
        {
          type: 'module',
        },
      );
    }

    // Create a callback function for messages from the worker thread.

    const onMessageReceived = (e: MessageEvent) => {
      switch (e.data.status) {
        case 'initiate':
          // Model file start load: add a new progress item to the list.
          setReady(false);
          setProgressItems(prev => [...prev, e.data]);
          break;

        case 'progress':
          // Model file progress: update one of the progress items.
          setProgressItems(prev =>
            prev.map(item => {
              if (item.file === e.data.file) {
                return { ...item, progress: e.data.progress };
              }
              return item;
            }),
          );
          break;

        case 'done':
          // Model file loaded: remove the progress item from the list.
          setProgressItems(prev =>
            prev.filter(item => item.file !== e.data.file),
          );
          break;

        case 'ready':
          // Pipeline ready: the worker is ready to accept messages.
          setReady(true);
          break;

        case 'complete':
          // Generation complete: re-enable the "Translate" button
          setDisabled(false);

          const blobUrl = URL.createObjectURL(e.data.output);
          setOutput(blobUrl);
          break;
      }
    };

    // Attach the callback function as an event listener.
    worker.current.addEventListener('message', onMessageReceived);

    // Define a cleanup function for when the component is unmounted.
    return () =>
      worker.current?.removeEventListener('message', onMessageReceived);
  });

  const handleGenerateSpeech = useCallback((text: string) => {
    if (worker.current) {
      setDisabled(true);
      worker.current.postMessage({
        text,
        speaker_id: selectedSpeaker,
      });
    }
  }, []);

  return { handleGenerateSpeech, ready, progressItems, disabled, output };
}
