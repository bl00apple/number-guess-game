//random number set
//User inserts number. And then presses the button "GO"
//If the user gets the correct number: print "You are correct"
//If randomNum < userNum : print Down
//If randomNum > userNum : print Up
//Reset button
//5번의 기회를 다 쓰면 게임이 끝난다. (더이상 추측 불가. button disable)
//유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
//유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깎지 않는다.

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chanceArea = document.getElementById("chance-area");
let chances = 5;
let gameOver = false;
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function pickRandomNum() {
  computerNum = Math.floor(Math.random(0, 100) * 100) + 1;
  console.log("정답", computerNum);
}


function play() {
  let userValue = userInput.value;

  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "Insert numbers through 1 to 100.";
    return;
  }

  if (history.includes(userValue)) {
    resultArea.textContent =
      "You already inserted this number. Please insert another.";
    return;
  }
  chances--;
  chanceArea.textContent = `Chances left: ${chances}`;

  if (userValue < computerNum) {
    resultArea.textContent = "Up.";
  } else if (userValue > computerNum) {
    resultArea.textContent = "Down.";
  } else {
    resultArea.textContent = "You got the answer.";
    playButton.disabled = true;
  }

  history.push(userValue);
  console.log(history);

  if (chances == 0) {
    gameOver = true;
  }

  if (gameOver == true) {
    playButton.disabled = true;
    resultArea.textContent = "Try again.";
  }
}

function reset() {
  //user-input창 깨끗하게 정리됨.
  userInput.value = "";
  //새로운 번호가 생성됨.
  resultArea.textContent = "Pick a number.";
  pickRandomNum();
  gameOver = false;
  playButton.disabled = false;
  chances = 5;
  chanceArea.textContent = `Chances left: ${chances}`;
  history = [];
}

pickRandomNum();
