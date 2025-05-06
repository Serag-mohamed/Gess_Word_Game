let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").append(gameName);
document.querySelector(
  "footer"
).innerHTML = `${gameName} Game Created By Siraj Mohamed`;
// Sitting Game Options //

let numberOfTries = 6;
let numberOfLetters = 5;
let curentTry = 1;
let numberOfHints = 2;

// Manage Words
let wordToGuess = "";
let words = [
  "Serag",
  "Ahmed",
  "Osama",
  "Bshir",
  "Sayed",
  "Fridh",
  "Samah",
  "Randa",
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");

// manage Hint
document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);

function generateInput() {
  let inputsContainer = document.querySelector(".inputs");

  // Create Main Try Div
  for (let i = 1; i <= numberOfTries; i++) {
    let tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) {
      tryDiv.classList.add("disabled-inputs");
    }
    // Create Inputs
    for (let n = 1; n <= numberOfLetters; n++) {
      let input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${n}`;
      input.setAttribute("maxlength", 1);
      tryDiv.append(input);
    }

    inputsContainer.appendChild(tryDiv);
  }
  // Focus On First Input In First Try Element
  inputsContainer.children[0].children[1].focus();

  // Disable All Input Except First One
  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-inputs input"
  );
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    // Convert Input To Uppercase
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      // console.log(index);
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });

    input.addEventListener("keydown", function (event) {
      // console.log(event);
      const currentIndex = Array.from(inputs).indexOf(event.target); // or this
      // console.log(currentIndex);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}
console.log(wordToGuess);
const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handelGuesses);
function handelGuesses() {
  let successGuess = true;
  for (let i = 1; i <= numberOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${curentTry}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    // Game Logic
    if (letter === actualLetter) {
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }

  // Check If User Win Or Lose
  if (successGuess) {
    messageArea.innerHTML = `You Win The word Is<span> ${wordToGuess}</span>`;
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
    guessButton.disabled = true;
    getHintButton.disabled = true;
  } else {
    document
      .querySelector(`.try-${curentTry}`)
      .classList.add("disabled-inputs");
    const currentTryInputs = document.querySelectorAll(
      `.try-${curentTry} input`
    );
    currentTryInputs.forEach((input) => (input.disabled = true));
    curentTry++;
    const nextTryInputs = document.querySelectorAll(`.try-${curentTry} input`);
    nextTryInputs.forEach((input) => (input.disabled = false));
    let el = document.querySelector(`.try-${curentTry}`);
    if (el) {
      document;
      el.classList.remove("disabled-inputs");
      el.children[1].focus();
    } else {
      guessButton.disabled = true;
      getHintButton.disabled = true;
      messageArea.innerHTML = `You Lose the Word Is <span>${wordToGuess}</span>`;
    }
  }
}

function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }

  if (numberOfHints === 0) {
    getHintButton.disabled = true;
  }

  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  const emptyEnabledInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );
  if (emptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
    console.log(randomIndex);
    console.log(indexToFill);
    // console.log(randomInput);

    randomInput.value = wordToGuess[indexToFill].toUpperCase();
  }
}

function handelBackSpace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    if (currentIndex > 0) {
      const currentInput = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];
      currentInput.value = "";
      prevInput.value = "";
      prevInput.focus();
    }
  }
}

document.addEventListener("keydown", handelBackSpace);
window.onload = function () {
  generateInput();
};
