// expose.js

window.addEventListener('DOMContentLoaded', init);
function init() {
  const selector = document.getElementById("horn-select");
  const hornImg = document.querySelector("img");
  const audio = document.querySelector("audio");
  selector.addEventListener("change", () => {
    hornImg.src = `assets/images/${selector.value}.svg`;
    audio.src = `assets/audio/${selector.value}.mp3`;
  });
  const slider =  document.getElementById("volume");
  const volumeImg = document.querySelector("#volume-controls img");
  const jsConfetti = new JSConfetti()
  slider.addEventListener("input", () => {
    if (slider.value == 0){
      volumeImg.src = "assets/icons/volume-level-0.svg";
    } else if (slider.value < 33){
      volumeImg.src = "assets/icons/volume-level-1.svg";
    } else if (slider.value < 67){
      volumeImg.src = "assets/icons/volume-level-2.svg";
    } else {
      volumeImg.src = "assets/icons/volume-level-3.svg";
    }
    audio.volume = slider.value / 100;
  });
  const button = document.querySelector("button");
  button.addEventListener("click", () => {
    audio.play();
    if (selector.value == "party-horn"){
      jsConfetti.addConfetti();
    }
  });
}