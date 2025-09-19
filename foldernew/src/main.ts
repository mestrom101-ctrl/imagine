
import './style.css';

// Timer countdown functionality
let timeLeft = 12 * 60 + 8; // 12:08 in seconds
function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  const timer = document.querySelector<HTMLElement>('.timer');
  const timerSecond = document.getElementById('timer-second');
  if (timer) timer.textContent = display;
  if (timerSecond) timerSecond.textContent = display;
  if (timeLeft > 0) timeLeft--;
}
setInterval(updateTimer, 1000);

// Button interactions for main page only
const verifyBtn = document.querySelector<HTMLButtonElement>('.verify-btn');
if (verifyBtn) {
  verifyBtn.addEventListener('click', function () {
    verifyBtn.textContent = 'VERIFYING...';
    verifyBtn.style.background = '#999';
    verifyBtn.disabled = true;
    // Hide any previous protocol message
    const protocolMsg = document.querySelector<HTMLElement>('.protocol-message');
    if (protocolMsg) protocolMsg.style.display = 'none';
    setTimeout(() => {
      verifyBtn.textContent = 'VERIFY';
      verifyBtn.style.background = '#3A5AC5';
      verifyBtn.disabled = false;
      // Enable proceed button after verification
      const proceedBtn = document.querySelector<HTMLButtonElement>('.proceed-btn');
      if (proceedBtn) {
        proceedBtn.style.background = '#3A5AC5';
        proceedBtn.style.cursor = 'pointer';
      }
      // Show protocol found message
      if (protocolMsg) protocolMsg.style.display = 'flex';
    }, 2000);
  });
}

const backBtn = document.querySelector<HTMLButtonElement>('.back-btn');
if (backBtn) {
  backBtn.addEventListener('click', function () {
    alert('Going back to previous step...');
  });
}

const proceedBtn = document.querySelector<HTMLButtonElement>('.proceed-btn');
if (proceedBtn) {
  proceedBtn.addEventListener('click', function () {
    if (
      proceedBtn.style.background === 'rgb(58, 90, 197)' ||
      proceedBtn.style.background === '#3A5AC5'
    ) {
      const mainPage = document.getElementById('main-page');
      if (mainPage) mainPage.classList.add('hidden');
      // Dynamically load second-page.html from /public
      fetch('/second-page.html')
        .then((response) => response.text())
        .then((html) => {
          const container = document.getElementById('second-page-container');
          if (container) container.innerHTML = html;
          const secondPage = document.getElementById('second-page');
          if (secondPage) {
            secondPage.classList.remove('hidden');
          }
          // Re-initialize timer and interactivity for second page
          initSecondPageInteractivity();
          window.scrollTo(0, 0);
        });
    } else {
      alert('Please verify the protocol number first.');
    }
  });
}

const inputField = document.querySelector<HTMLInputElement>('.input-field');
if (inputField) {
  inputField.addEventListener('input', function () {
    const protocolMsg = document.querySelector<HTMLElement>('.protocol-message');
    const proceedBtn = document.querySelector<HTMLButtonElement>('.proceed-btn');
    if (inputField.value.trim() !== 'P-RM/H/L/2025/1015473') {
      if (protocolMsg) protocolMsg.style.display = 'none';
      if (proceedBtn) {
        proceedBtn.style.background = '#b0b8d4';
        proceedBtn.style.cursor = 'not-allowed';
      }
    } else {
      if (protocolMsg) protocolMsg.style.display = 'none';
      if (proceedBtn) {
        proceedBtn.style.background = '#3A5AC5';
        proceedBtn.style.cursor = 'pointer';
      }
    }
  });
}


function initSecondPageInteractivity() {
  // Timer for second page
  let timeLeft2 = timeLeft;
  function updateTimer2() {
    const minutes = Math.floor(timeLeft2 / 60);
    const seconds = timeLeft2 % 60;
    const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    const timer = document.querySelector<HTMLElement>('#second-page .timer');
    if (timer) timer.textContent = display;
    if (timeLeft2 > 0) timeLeft2--;
  }
  setInterval(updateTimer2, 1000);

  // Schedule button selection
  const scheduleBtns = document.querySelectorAll<HTMLButtonElement>('#second-page .schedule-btn');
  scheduleBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      scheduleBtns.forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // Navigation buttons
  const navBtns = document.querySelectorAll<HTMLButtonElement>('#second-page .nav-btn');
  if (navBtns.length === 2) {
    navBtns[0].addEventListener('click', function () {
      alert('Returning to applicants info...');
    });
    navBtns[1].addEventListener('click', function () {
      alert('Proceeding to add services...');
    });
  }
}
