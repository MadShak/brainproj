// By Shak

const chat = document.getElementById('chat');
const form = document.getElementById('form');

if (form !== null) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = document.getElementById('message').value;
    chat.innerHTML += `<p>Pensando sobre *${message}*...</p>`;

  
    // Request
    fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
        prompt: message,
        model: 'text-davinci-003',
        max_tokens: 4000
      })
    }).then(response => response.json())
      .then(data => {
        const text = data.choices;
        chat.innerHTML += `<p>${text[0].text}</p>`;
      });
  });
}

document.getElementById('refreshButton').addEventListener('click', function() {
  location.reload();
});