const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
          </span>
        `
      )
      .join("")}
  `;

  const innerWord = wordEl.innerText.replace(/[ \n]/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    popup.style.display = "flex";

    playable = false;
  }
}

// Update the wrong letters
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
    popup.style.display = "flex";

    playable = false;
  }
}

// Show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Keydown letter press
window.addEventListener("keydown", (e) => {
  if (playable) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key.toLowerCase();

      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);

          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);

          updateWrongLettersEl();
        } else {
          showNotification();
        }
      }
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener("click", () => {
  playable = true;

  //  Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = "none";
});

displayWord();

// const figureParts = document.querySelectorAll(".figure-part");

// const words = ["application", "programing", "interface", "wizard"];

// // to get a random words
// let selectedWord = words[Math.floor(Math.random() * words.length)];

// const correctLetters = [];
// const wrongLetters = [];

// // function to display  hidenwords on the screen
// function displayWord() {
//   wordEl.innerHTML = `
//   ${selectedWord
//     .split("")
//     .map(
//       (letter) => `
//     <span class=""letter>
//     ${correctLetters.includes(letter) ? letter : ""}
//     </span>`
//     )
//     .join("")}
//   `;
//   // were setting the innerHTMl of wordEl to the selectedWord, split("") =. to an array
//   // we map throught it and se it if the letter is included in the array
//   // if it is we gonna out put the letter
//   // if is not (?) or else we gonna out put an empty string
//   // and turn it back to an string =. join('')

//   //remove to put all the word on one line in the console and check if we match the word
//   const innerWord = wordEl.innerText.replace(/\n/g, "");

//   if (innerWord === selectedWord) {
//     finalMessage.innerText = "Congratulations! You won! 😃";
//     popup.style.display = "flex";
//   }
// }

// // update the wrong letters,
// function updateWrongLettersEl() {
//   wrongLettersEl.innerHTML = `
//   ${wrongLettersEl.length > 0 ? "<p>Wrong</p>" : ""}
//   ${wrongLettersEl.map((letter) => `<span>${letter}</span>`)}
//   `;
//   // first thing we gonna check if there is anything in the wrong letter by length>0
//   // (?) if there is than we put our <p>Wrong</p> (:) <= else just emtpy string
//   // we take the wrong letterEL we gonna map throught, and add the letter in the span

//   //   working on the figure parts
//   figureParts.forEach((part, index) => {
//     // to see how many errors there are
//     const errors = wrongLetters.length;
//     // this is how we add the hangman part
//     if (index < errors) {
//       part.style.display = "block";
//     } else {
//       part.style.display = "none";
//     }
//   });

//   //check if lost and get the wrong message popup
//   if (wrongLettersEl === figureParts.length) {
//     finalMessage.innerText = "Unfortunately you lost. 😕";
//     popup.style.display = "flex";
//   }
// }

// //show notifications
// function showNotification() {
//   notification.classList.add("show");
//   // setting a time out 2s for our shownotifications
//   setTimeout(() => {
//     notification.classList.remove("show");
//   }, 20000);
// }

// // Keydown letter press
// window.addEventListener("keydown", (e) => {
//   if (playable) {
//     if (e.keyCode >= 65 && e.keyCode <= 90) {
//       const letter = e.key.toLowerCase();

//       if (selectedWord.includes(letter)) {
//         // if not the correct letter in our array then we continue
//         if (!correctLetters.includes(letter)) {
//           correctLetters.push(letter);

//           displayWord();
//         } else {
//           showNotification();
//         }
//       } else {
//         // make sure if not there already the wrong letter, like if is not already included. than puh it
//         if (!wrongLetters.includes(letter)) {
//           wrongLetters.push(letter);

//           updateWrongLettersEl();
//         } else {
//           showNotification();
//         }
//       }
//     }
//   }
// });

// //restart the game and play again
// playAgainBtn.addEventListener("click", () => {
//   // / empty the array
//   correctLetters.splice(0);
//   wrongLettersEl.splice(0);

//   // display a new words
//   selectedWord = words[Math.floor(Math.random() * words)];
//   //call the display word function
//   displayWord;

//   //clean up the wrongletter nad clean the figure parts
//   updateWrongLettersEl();

//   //hide the popup
//   popup.style.display = "none";

// });
// displayWord();
