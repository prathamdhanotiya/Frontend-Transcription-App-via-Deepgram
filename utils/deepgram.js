import axios from "axios";

export async function transcribeAudio(audioBlob) {
  const deepgramApiKey = "1b1efd07f4630937fa6c1485080fa6db8d66be51"; // Replace with your Deepgram API key

  const formData = new FormData();
  formData.append("audio", audioBlob);

  try {
    const response = await axios.post(
      "https://api.deepgram.com/v1/listen",
      formData,
      {
        headers: {
          Authorization: `Token ${deepgramApiKey}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Deepgram API Response:", response.data); // Debugging
    return response.data.results.channels[0].alternatives[0].transcript;
  } catch (error) {
    console.error("Error transcribing audio:", error.response?.data || error.message);
    throw new Error("Transcription failed.");
  }
}
