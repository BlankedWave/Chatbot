const messagesEl = document.getElementById('messages');
const inputEl = document.getElementById('composerInput');
const sendBtn = document.getElementById('sendBtn');
const historyListEl = document.getElementById('historyList');
const themeToggleBtn = document.getElementById('themeToggle');

// Theme Toggle
themeToggleBtn.addEventListener('click', () => {
  const body = document.body;
  const isDark = body.getAttribute('data-theme') === 'dark';
  body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeToggleBtn.textContent = isDark ? '🌙' : '☀️';
});

// History
let history = [];

function saveHistory(prompt) {
  history.push(prompt);
  renderHistory();
}

function renderHistory() {
  historyListEl.innerHTML = '';
  history.forEach((msg, idx) => {
    const btn = document.createElement('button');
    btn.className = 'text-left w-full bg-gray-200 p-2 rounded hover:bg-gray-300';
    btn.textContent = msg.length > 30 ? msg.slice(0, 30) + '...' : msg;
    btn.onclick = () => inputEl.value = msg;
    historyListEl.appendChild(btn);
  });
}

// Message Renderer
function appendMessage(role, content) {
  const div = document.createElement('div');
  div.className = role === 'user' ? 'text-right' : 'text-left';
  div.innerHTML = `
    <div class="${role === 'user' ? 'bg-blue-100' : 'bg-gray-200'} inline-block px-4 py-2 rounded shadow max-w-lg">
      ${content}
    </div>`;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// API Call
async function sendMessage() {
  const prompt = inputEl.value.trim();
  if (!prompt) return;
  appendMessage('user', prompt);
  inputEl.value = '';
  saveHistory(prompt);

  try {
    const res = await fetch('https://api.blankedwave.repl.co/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    appendMessage('bot', data.response || '(Tiada jawapan diterima)');
  } catch (err) {
    appendMessage('bot', 'Ralat sambungan ke pelayan API.');
    console.error(err);
  }
}

sendBtn.addEventListener('click', sendMessage);
inputEl.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});
