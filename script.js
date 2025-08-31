let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

// ✅ load high score from localStorage (if available)
let highScore = localStorage.getItem("simonHighScore") || 0;

let h2 = document.querySelector("h2");

// start game on keypress
document.addEventListener("keypress", function () {
  if (!started) {
    console.log("game started");
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4); 
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  console.log("Game Sequence:", gameSeq);

  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    // ✅ update high score only if beaten
    if (level > highScore) {
      highScore = level;
      localStorage.setItem("simonHighScore", highScore); // save to storage
    }

    h2.innerHTML = `Game Over! Your score was <b>${level}</b> 
                    <br> Highest Score: <b>${highScore}</b> 
                    <br> Press any key to start.`;

    // ✅ background flashes red, then white
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "white";
    }, 300);

    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

