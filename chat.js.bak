    const messagesEl = document.getElementById('messages');
    const inputEl = document.getElementById('composerInput');
    const sendBtn = document.getElementById('sendBtn');
    const historyList = document.getElementById('historyList');
    const themeToggle = document.getElementById('themeToggle');

    let chatHistory = [];

    function appendMessage(sender, text) {
      const msgEl = document.createElement('div');
      msgEl.className = sender === 'user' ? 'text-right' : 'text-left';
      msgEl.innerHTML = `<div class="inline-block bg-${sender === 'user' ? 'blue' : 'gray'}-200 px-4 py-2 rounded-lg max-w-[75%]">${text}</div>`;
      messagesEl.appendChild(msgEl);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    async function sendMessage() {
      const text = inputEl.value.trim();
      if (!text) return;

      appendMessage('user', text);
      chatHistory.push({ role: 'user', content: text });
      inputEl.value = '';

      try {
        const response = await fetch('https://backend.buildpicoapps.com/aero/run/llm-api?pk=v1-Z0FBQUFBQm5HUEtMSjJkakVjcF9IQ0M0VFhRQ0FmSnNDSHNYTlJSblE0UXo1Q3RBcjFPcl9YYy1OZUhteDZWekxHdWRLM1M1alNZTkJMWEhNOWd4S1NPSDBTWC12M0U2UGc9PQ==', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ messages: chatHistory })
        });

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || 'Tiada jawapan.';
        appendMessage('bot', reply);
        chatHistory.push({ role: 'assistant', content: reply });
      } catch (err) {
        appendMessage('bot', `Ralat sambungan ke pelayan API: ${err.message}`);
        console.error('API Error:', err);
      }
    }

    sendBtn.addEventListener('click', sendMessage);
    inputEl.addEventListener('keypress', e => {
      if (e.key === 'Enter') sendMessage();
    });

    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('bg-gray-900');
      document.body.classList.toggle('text-white');
      messagesEl.classList.toggle('bg-gray-800');
      themeToggle.textContent = isDark ? '☀️' : '🌙';
    });
