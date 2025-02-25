import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { CiMicrophoneOn } from 'react-icons/ci';
import { IoCloseOutline, IoCheckmark } from 'react-icons/io5';
import SpeechRecognizer from '@@/utils/SpeechRecognizer';

const MAX_BARS = 60;

const MicRecorder: React.FC<{
  cb: (err: Error | null, txt: string | null) => void;
}> = ({ cb }) => {
  const [recording, setRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [shouldSendTranscript, setShouldSendTranscript] =
    useState<boolean>(false);
  const [audioLevels, setAudioLevels] = useState<number[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startAudioAnalysis = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateAudioLevel = () => {
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(dataArray);

          let sumSquares = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sumSquares += dataArray[i] * dataArray[i];
          }
          const rms = Math.round(Math.sqrt(sumSquares / dataArray.length));

          setAudioLevels((prev) => {
            const newLevels = [...prev, rms];
            if (newLevels.length > MAX_BARS) {
              newLevels.shift();
            }

            return newLevels;
          });

          animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
        }
      };

      updateAudioLevel();
    } catch (err: any) {
      cb(err, null);
    }
  }, [setAudioLevels, cb]);

  const stopAudioAnalysis = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    setAudioLevels([]);
  }, [setAudioLevels]);

  const handleStart = useCallback(async () => {
    setRecording(true);
    startAudioAnalysis();
    try {
      const text = await SpeechRecognizer.start();
      setTranscript(text);
    } catch (err: any) {
      cb(err, null);
    } finally {
      setRecording(false);
      stopAudioAnalysis();
    }
  }, [setRecording, startAudioAnalysis, stopAudioAnalysis, cb, setTranscript]);

  const handleCancel = useCallback(() => {
    setShouldSendTranscript(false);
    SpeechRecognizer.stop();
  }, [setShouldSendTranscript]);

  const handleValidate = useCallback(() => {
    setShouldSendTranscript(true);
    SpeechRecognizer.stop();
  }, [setShouldSendTranscript]);

  useEffect(() => {
    if (transcript && shouldSendTranscript) {
      cb(null, transcript);
    }

    return () => {
      handleCancel();
    };
  }, [handleCancel, transcript, cb]);

  const recordingFeedback = useMemo(() => {
    if (!recording) {
      return null;
    }

    return (
      <div className="flex flex-row items-center gap-2 w-fit mx-auto">
        <button
          onClick={handleCancel}
          className="h-5 w-5 bg-gray-500 p-1 rounded-full flex flex-col items-center justify-center"
        >
          <IoCloseOutline className="text-white h-5 w-5" />
        </button>
        <div className="flex items-end h-6 bg-gray-200 rounded overflow-hidden">
          {audioLevels.map((level, index) => {
            return (
              <div
                key={index}
                className="w-[2px] sm:w-[5px] mx-[0.5px] bg-gray-600 transition-all duration-100"
                style={{ height: `${level}%` }}
              />
            );
          })}
        </div>
        <button
          onClick={handleValidate}
          className="h-6 w-6 bg-emerald-500 rounded-full flex flex-col items-center justify-center"
        >
          <IoCheckmark size={16} className="text-white" />
        </button>
      </div>
    );
  }, [recording, audioLevels, handleCancel, handleValidate]);

  return (
    <div className="w-full">
      {recordingFeedback}

      {!recording && (
        <button
          onClick={handleStart}
          className="mt-0.5 p-0.5 rounded-md bg-gray-200"
        >
          <CiMicrophoneOn size={24} />
        </button>
      )}
    </div>
  );
};

export default MicRecorder;
