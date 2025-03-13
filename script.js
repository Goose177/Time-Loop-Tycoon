// Game Variables
let timeLeft = 1440; // 24 hours in minutes
let money = 0;
let loopCount = 1;
let upgradeCost = 50;
let workEarnings = 10;

// DOM Elements
const timeLeftDisplay = document.getElementById('time-left');
const moneyDisplay = document.getElementById('money');
const loopCountDisplay = document.getElementById('loop-count');
const messageDisplay = document.getElementById('message');
const workButton = document.getElementById('work-button');
const upgradeButton = document.getElementById('upgrade-button');
const resetButton = document.getElementById('reset-button');
const saveButton = document.getElementById('save-button');
const loadButton = document.getElementById('load-button');
const upgradeCostDisplay = document.getElementById('upgrade-cost');

// Bot Elements
const botLogo = document.getElementById('bot-logo');
const chatWindow = document.getElementById('chat-window');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');

// Update the game state every second
let gameLoop = setInterval(updateGame, 1000);

function updateGame() {
  if (timeLeft > 0) {
    timeLeft--;
  } else {
    resetLoop();
  }
  updateDisplay();
}

function updateDisplay() {
  const hours = Math.floor(timeLeft / 60);
  const minutes = timeLeft % 60;
  timeLeftDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  moneyDisplay.textContent = money;
  loopCountDisplay.textContent = loopCount;
  upgradeCostDisplay.textContent = upgradeCost;
}

function resetLoop() {
  timeLeft = 1440;
  loopCount++;
  messageDisplay.textContent = `Loop ${loopCount} started!`;
}

// Save/Load System
function saveGame() {
  const gameState = {
    timeLeft,
    money,
    loopCount,
    upgradeCost,
    workEarnings,
  };
  localStorage.setItem('timeLoopTycoonSave', JSON.stringify(gameState));
  messageDisplay.textContent = 'Game saved!';
}

function loadGame() {
  const savedGame = localStorage.getItem('timeLoopTycoonSave');
  if (savedGame) {
    const gameState = JSON.parse(savedGame);
    timeLeft = gameState.timeLeft;
    money = gameState.money;
    loopCount = gameState.loopCount;
    upgradeCost = gameState.upgradeCost;
    workEarnings = gameState.workEarnings;
    updateDisplay();
    messageDisplay.textContent = 'Game loaded!';
  } else {
    messageDisplay.textContent = 'No saved game found!';
  }
}

// Event Listeners
workButton.addEventListener('click', () => {
  money += workEarnings;
  messageDisplay.textContent = `You earned $${workEarnings}!`;
});

upgradeButton.addEventListener('click', () => {
  if (money >= upgradeCost) {
    money -= upgradeCost;
    workEarnings += 5;
    upgradeCost *= 2;
    messageDisplay.textContent = `Upgraded! You now earn $${workEarnings} per work.`;
  } else {
    messageDisplay.textContent = 'Not enough money!';
  }
});

resetButton.addEventListener('click', () => {
  resetLoop();
});

saveButton.addEventListener('click', () => {
  saveGame();
});

loadButton.addEventListener('click', () => {
  loadGame();
});

// Bot Functionality
botLogo.addEventListener('click', () => {
  chatWindow.style.display = chatWindow.style.display === 'block' ? 'none' : 'block';
});

chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const userMessage = chatInput.value;
    chatMessages.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
    chatInput.value = '';
    setTimeout(() => {
      chatMessages.innerHTML += `<div><strong>Bot:</strong> How can I assist you?</div>`;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
  }
});