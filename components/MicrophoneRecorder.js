"use client";

import { useState, useRef } from "react";
import { transcribeAudio } from "../utils/deepgram";

export default function MicrophoneRecorder({ onTranscription }) {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const handleStartRecording = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone accessed successfully."); // Debugging
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      setError("Error accessing the microphone. Please allow microphone access.");
    }
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    mediaRecorderRef.current.stop();

    const audioBlob = new Blob(audioChunks.current, { type: "audio/wav; codecs=LINEAR16" });
    audioChunks.current = []; // Reset chunks for next recording

    console.log("Audio Blob Size:", audioBlob.size); // Debugging
    if (audioBlob.size === 0) {
      setError("No audio recorded. Please try again.");
      return;
    }

    try {
      const transcription = await transcribeAudio(audioBlob);
      onTranscription(transcription || "No transcription available.");
    } catch (err) {
      setError("Failed to transcribe audio. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        className={`px-4 py-2 text-white rounded-md ${
          isRecording ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
}
