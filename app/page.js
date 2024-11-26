"use client";

import { useState } from "react";
import MicrophoneRecorder from "../components/MicrophoneRecorder";

export default function Home() {
  const [transcription, setTranscription] = useState("");

  const handleTranscription = (text) => {
    setTranscription(text);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-6">Audio Transcription App</h1>
      <MicrophoneRecorder onTranscription={handleTranscription} />
      {transcription && (
        <div className="mt-6 bg-white shadow-md p-4 rounded-md max-w-md w-full">
          <h2 className="text-xl font-semibold mb-2">Transcription:</h2>
          <p className="text-gray-700">{transcription}</p>
        </div>
      )}
    </div>
  );
}
