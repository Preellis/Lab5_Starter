// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;
  let voices = [];
  const voiceSelect = document.getElementById("voice-select");
  const populateVoiceList = () => {
    voices = synth.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase();
      const bname = b.name.toUpperCase();
      if (aname < bname) {
        return -1;
      } else if (aname == bname) {
        return 0;
      } else {
        return +1;
      }
    });
    console.log(voices)
    const selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
    voiceSelect.innerHTML = `<option value="select" disabled selected>Select Voice:</option>`;

    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
      option.value = `${voices[i].name} (${voices[i].lang})`;
      voiceSelect.appendChild(option);
    }
    voiceSelect.selectedIndex = selectedIndex;
  }
  synth.onvoiceschanged = populateVoiceList;
  const inputTxt = document.getElementById("text-to-speak");
  const button = document.querySelector("button");
  const img = document.querySelector("img");
  button.addEventListener("click", () => {
    const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    const selectedOption = voiceSelect.value;
    if (selectedOption == "select") return;
    for (let i = 0; i < voices.length; i++) {
      if (`${voices[i].name} (${voices[i].lang})` == selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    synth.speak(utterThis);
    const interval = setInterval(() => {
      if (synth.speaking) {
        img.src = "assets/images/smiling-open.png";
      } else {
        img.src = "assets/images/smiling.png";
        clearInterval(interval);
      }
    }, 100);
  });
}
