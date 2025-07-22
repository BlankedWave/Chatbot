const apiKey = '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'; // Don't push this to GitHub

const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chatbox');

async function fetchBotReply(message) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Anda adalah chatbot yang hanya menggunakan Bahasa Melayu.' },
        { role: 'user', content: message },
      ],
    }),
  });

  const data = await response.json();
  const botReply = data.choices[0].message.content.trim();
  return botReply;
}

function appendMessage(sender, text) {
  const bubble = document.createElement('div');
  bubble.className = sender === 'user' ? 'text-right' : 'text-left';
  bubble.innerHTML = `
    <div class="inline-block bg-${sender === 'user' ? 'blue' : 'gray'}-200 text-${sender === 'user' ? 'black' : 'gray-900'} px-4 py-2 rounded-xl">
      <p class="text-sm">${text}</p>
    </div>
  `;
  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = userInput.value;
  appendMessage('user', message);
  userInput.value = '';

  appendMessage('bot', 'Taip...');
  const bubbles = chatBox.querySelectorAll('.text-left');
  const loadingBubble = bubbles[bubbles.length - 1];

  try {
    const reply = await fetchBotReply(message);
    loadingBubble.remove();
    appendMessage('bot', reply);
  } catch (error) {
    loadingBubble.remove();
    appendMessage('bot', 'Maaf, berlaku ralat.');
    console.error('Error:', error);
  }
});
