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

// Chatbot Elements
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

// Chatbot Functionality
botLogo.addEventListener('click', () => {
  chatWindow.style.display = chatWindow.style.display === 'block' ? 'none' : 'block';
});

// Predefined Chat Options
const chatOptions = {
  "how-to-play": "Welcome to Time Loop Tycoon! Manage your time, earn money, and upgrade your business to break the time loop. Click 'Work' to earn money, 'Upgrade' to increase earnings, and 'Reset Loop' to start a new day.",
  "version": "You're playing Time Loop Tycoon Beta 2.0!",
  "how-to-save": "Click the 'Save Game' button to save your progress. Your game data will be stored in your browser.",
  "how-to-load": "Click the 'Load Game' button to load your saved progress. Make sure you've saved the game first!",
  "invite-friends": "Invite your friends to play Time Loop Tycoon! Share this link: https://goose177.github.io/Time-Loop-Tycoon/",
  "about-company": "Our company, Black Leo, is dedicated to creating fun and engaging games. Stay tuned for more updates!",
};

// Add Event Listeners to Chat Options
document.querySelectorAll('.chat-options button').forEach(button => {
  button.addEventListener('click', () => {
    const option = button.id;
    const message = chatOptions[option];
    chatMessages.innerHTML += `<div><strong>Bot:</strong> ${message}</div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
});

// Handle User Input
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && chatInput.value.trim() !== '') {
    const userMessage = chatInput.value;
    chatMessages.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
    chatInput.value = '';
    setTimeout(() => {
      chatMessages.innerHTML += `<div><strong>Bot:</strong> How can I assist you?</div>`;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
  }
});

// New Upgrades
document.getElementById('time-extender').addEventListener('click', () => {
  if (money >= 100) {
    money -= 100;
    timeLeft += 360; // +6 hours
    messageDisplay.textContent = 'Time extended by 6 hours!';
  } else {
    messageDisplay.textContent = 'Not enough money!';
  }
});

document.getElementById('efficiency-boost').addEventListener('click', () => {
  if (money >= 200) {
    money -= 200;
    workEarnings *= 2;
    messageDisplay.textContent = 'Efficiency boosted! Earnings doubled!';
  } else {
    messageDisplay.textContent = 'Not enough money!';
  }
});

document.getElementById('investor-funding').addEventListener('click', () => {
  if (money >= 500) {
    money -= 500;
    money += 1000; // +$1000
    messageDisplay.textContent = 'Investor funding received! +$1000!';
  } else {
    messageDisplay.textContent = 'Not enough money!';
  }
});
