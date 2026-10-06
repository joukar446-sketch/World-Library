let selected = 0;

function moveRight() {
  selected++;
  if (selected >= games.length) selected = 0;
  showGames();
}

function moveLeft() {
  selected--;
  if (selected < 0) selected = games.length - 1;
  showGames();
}

function moveUp() {
  moveLeft();
}

function moveDown() {
  moveRight();
}

function selectGame() {
  document.getElementById("status").innerText =
    "🎮 Selected: " + games[selected].name;
}

function backGame() {
  document.getElementById("status").innerText = "↩️ Back";
}

document.addEventListener("keydown", function(e) {
  if (e.key === "ArrowRight") moveRight();
  if (e.key === "ArrowLeft") moveLeft();
  if (e.key === "ArrowUp") moveUp();
  if (e.key === "ArrowDown") moveDown();

  if (e.key === "Enter" || e.key === "x" || e.key === "X") {
    selectGame();
  }

  if (e.key === "Escape" || e.key === "o" || e.key === "O") {
    backGame();
  }
});
