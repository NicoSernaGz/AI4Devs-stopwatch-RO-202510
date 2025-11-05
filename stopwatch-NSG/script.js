/* ------------------- CRONÓMETRO ------------------- */
let timerInterval;
let timerSeconds = 0;
let isRunning = false;

const timerDisplay = document.getElementById('timer-display');
const startTimerBtn = document.getElementById('start-timer');
const pauseTimerBtn = document.getElementById('pause-timer');
const resetTimerBtn = document.getElementById('reset-timer');

function updateTimerDisplay() {
  const hrs = String(Math.floor(timerSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((timerSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(timerSeconds % 60).padStart(2, '0');
  timerDisplay.textContent = `${hrs}:${mins}:${secs}`;
}

function startTimer() {
  if (isRunning) return; // evita iniciar múltiples intervalos
  isRunning = true;
  timerInterval = setInterval(() => {
    timerSeconds++;
    updateTimerDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  timerSeconds = 0;
  updateTimerDisplay();
}

startTimerBtn.addEventListener('click', startTimer);
pauseTimerBtn.addEventListener('click', pauseTimer);
resetTimerBtn.addEventListener('click', resetTimer);

/* ------------------- CUENTA ATRÁS ------------------- */
let countdownInterval;
let countdownTime = 0;

const countdownInput = document.getElementById('countdown-input');
const countdownDisplay = document.getElementById('countdown-display');
const countdownBtn = document.getElementById('start-countdown');
const countdownMsg = document.getElementById('countdown-message');

function updateCountdownDisplay() {
  const mins = String(Math.floor(countdownTime / 60)).padStart(2, '0');
  const secs = String(countdownTime % 60).padStart(2, '0');
  countdownDisplay.textContent = `${mins}:${secs}`;
}

function startCountdown() {
  // Reinicia si ya hay una cuenta corriendo
  clearInterval(countdownInterval);
  countdownMsg.textContent = '';

  const inputSeconds = parseInt(countdownInput.value);
  if (isNaN(inputSeconds) || inputSeconds <= 0) {
    countdownMsg.textContent = 'Por favor ingresa un valor válido.';
    return;
  }

  countdownTime = inputSeconds;
  updateCountdownDisplay();

  countdownInterval = setInterval(() => {
    countdownTime--;
    updateCountdownDisplay();

    if (countdownTime <= 0) {
      clearInterval(countdownInterval);
      countdownDisplay.textContent = '00:00';
      countdownMsg.textContent = '⏰ ¡Tiempo finalizado!';
    }
  }, 1000);
}

countdownBtn.addEventListener('click', startCountdown);
