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


// List of valid protocol values
const validProtocols = [
  'P-RM/H/L/2025/1015487',
  'P-RM/H/L/2025/1015488',
  'P-RM/H/L/2025/1015489',
  'P-RM/H/L/2025/1015490',
  'P-RM/H/L/2025/1015491',
  'P-RM/H/L/2025/1015492',
  'P-RM/H/L/2025/1015493',
  'P-RM/H/L/2025/1015494',
  'P-RM/H/L/2025/1015495',
  'P-RM/H/L/2025/1015496',
  'P-RM/H/L/2025/1015497',
  // Add more valid protocol numbers here
];

function showProtocolMessage(found: boolean) {
  const protocolMsg = document.querySelector<HTMLElement>('.protocol-message');
  if (!protocolMsg) return;
  protocolMsg.style.display = 'flex';
  if (found) {
    protocolMsg.innerHTML = `
      <span class="protocol-icon" style="display:inline-flex; align-items:center; justify-content:center; width:20px; height:20px; border-radius:50%; background:#28a745; color:white; font-weight:bold; font-size:12px;">✓</span>
      <span style="color:#28a745; font-weight:600;">Protocol found</span>
    `;
  } else {
    protocolMsg.innerHTML = `
      <span class="protocol-icon" style="display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L22 21H2L12 3Z" stroke="#dc3545" stroke-width="2.5" fill="none"/>
          <circle cx="12" cy="16.5" r="1.5" fill="#dc3545"/>
          <rect x="11" y="9" width="2" height="5" rx="1" fill="#dc3545"/>
        </svg>
      </span>
      <span style="color:#dc3545; font-weight:600;">Protocol not found</span>
    `;
  }
}

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
      const inputField = document.querySelector<HTMLInputElement>('.input-field');
      const value = inputField ? inputField.value.trim() : '';
      const found = validProtocols.includes(value);
      showProtocolMessage(found);
      // Enable or disable proceed button after verification
      const proceedBtn = document.querySelector<HTMLButtonElement>('.proceed-btn');
      if (proceedBtn) {
        if (found) {
          proceedBtn.style.background = '#3A5AC5';
          proceedBtn.style.cursor = 'pointer';
          proceedBtn.classList.add('enabled');
        } else {
          proceedBtn.style.background = '#b0b8d4';
          proceedBtn.style.cursor = 'not-allowed';
          proceedBtn.classList.remove('enabled');
        }
      }
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
        proceedBtn.classList.remove('enabled');
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

// Ensure this runs after the DOM is loaded and after second-page is loaded dynamically
function setupReturnToApplicantsInfo() {
  const returnBtn = document.querySelector('.nav-btn span');
  if (returnBtn && returnBtn.textContent?.includes('TORNA ALLE INFORMAZIONI DEL RICHIEDENTE')) {
    const btn = returnBtn.parentElement as HTMLButtonElement;
    btn.addEventListener('click', () => {
      // Hide second page, show main page
      const secondPage = document.getElementById('second-page');
      const mainPage = document.getElementById('main-page');
      if (secondPage) secondPage.classList.add('hidden');
      if (mainPage) mainPage.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Call this function after loading the second page dynamically
// Example:
fetch('/second-page.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('second-page-container')!.innerHTML = html;
    setupReturnToApplicantsInfo();
  });
