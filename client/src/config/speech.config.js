// Speech
let speech = new SpeechSynthesisUtterance();

export const cancelTextToSpeech = () => {
  const synth = window.speechSynthesis;
  if (synth.speaking || synth.pending) {
    synth.cancel();
  }
};

export const textToSpeech = (text, lang) => {
  cancelTextToSpeech();

  // Speak
  speech.text = text;

  // Add Lang feature
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
};
