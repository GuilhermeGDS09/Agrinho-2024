const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

const plantResponses = {
  greeting: "Olá! Eu sou a Plantinha, sua guia no site. Como posso ajudar você hoje?",
  water: "Lembre-se de regar suas plantinhas regularmente para mantê-las saudáveis!",
  sunlight: "As plantas precisam de luz solar para realizar a fotossíntese. Certifique-se de colocá-las em um local com luz adequada.",
  goodbye: "Até mais! Se precisar de mais alguma coisa, estarei aqui para ajudar."
};

function sendMessage() {
  const userMessage = userInput.value.trim();
  if (userMessage !== '') {
    appendMessage('user', userMessage);
    processMessage(userMessage.toLowerCase());
    userInput.value = '';
  }
}

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.innerText = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function processMessage(message) {
  if (message.includes('olá') || message.includes('oi') || message.includes('olá plantinha')) {
    appendMessage('plant', plantResponses.greeting);
  } else if (message.includes('água') || message.includes('regar')) {
    appendMessage('plant', plantResponses.water);
  } else if (message.includes('luz') || message.includes('sol')) {
    appendMessage('plant', plantResponses.sunlight);
  } else if (message.includes('adeus') || message.includes('tchau')) {
    appendMessage('plant', plantResponses.goodbye);
  } else {
    appendMessage('plant', "Desculpe, não entendi. Posso ajudar com algo mais?");
  }
}

// Saudação inicial da plantinha
appendMessage('plant', plantResponses.greeting);
