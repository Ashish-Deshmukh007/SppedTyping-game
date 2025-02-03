const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

//Set difficulty to value in local storage
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//Set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Cursor on start
text.focus();

// Countdown
const timeInterval = setInterval(updateTime, 1000);

// Fetch random word from API
async function getRandomWord() {
  const res = await fetch("https://random-word-api.herokuapp.com/word");
  const data = await res.json();
  return data[0];
}

// Add word to DOM
async function addWordToDOM() {
  randomWord = await getRandomWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + " s";

  if (time === 0) {
    clearInterval(timeInterval);
    // End game
    gameOver();
  }
}

// GameOver function, show end screen
function gameOver() {
  endgameEl.innerHTML = `
      <h1>Time ran out</h1>
      <p>Your final score is: ${score} </p>
      <button onclick="location.reload()">Reload</button>
    `;

  endgameEl.style.display = "flex";
}

addWordToDOM();

// Event listener for input
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear input
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

//Settings btn click
settingsBtn.addEventListener("click", () => settings.classList.toggle("show"));

//settings select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});


