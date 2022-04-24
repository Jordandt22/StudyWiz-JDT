import React, { createContext, useContext, useState } from "react";

// Franc
import { franc } from "franc";

// Speech Context
export const SpeechContext = createContext();
export const useSpeech = () => useContext(SpeechContext);

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const [speech, setSpeech] = useState({
    audioFrom: null,
    speaking: false,
  });
  const resetSpeech = () =>
    setSpeech((prevSpeech) => ({
      ...prevSpeech,
      audioFrom: null,
      speaking: false,
    }));

  // Cancel Text To Speech
  const cancelTextToSpeech = () => {
    window.speechSynthesis.cancel();
    resetSpeech();
  };

  // Start Text To Speech
  const textToSpeech = async (audioFrom, text) => {
    const synth = window.speechSynthesis;
    if (synth.speaking || synth.pending) return cancelTextToSpeech();

    // Language
    const detectedLang = franc(text, { minLength: 1 });
    let lang = "en-US";
    switch (detectedLang) {
      case "jpn":
        lang = "ja-JP";
        break;

      case "spa":
        lang = "es-ES";
        break;

      case "cmn":
        lang = "zh-CN";
        break;

      default:
        break;
    }

    // Set Up Speech
    let speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = lang;

    // Speak
    setSpeech((prevSpeech) => ({ ...prevSpeech, audioFrom, speaking: true }));
    window.speechSynthesis.speak(speech);

    // When Speech is Done
    speech.onend = () => resetSpeech();
  };

  return (
    <SpeechContext.Provider
      value={{ speech, textToSpeech, cancelTextToSpeech }}
    >
      {props.children}
    </SpeechContext.Provider>
  );
};
