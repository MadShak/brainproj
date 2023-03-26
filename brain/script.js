// By Shak

const chat = document.getElementById('chat');
const form = document.getElementById('form');

if (form !== null) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = document.getElementById('message').value;
    chat.innerHTML += `<p><strong>@Pinky:</strong> ${message}</p>`;

  
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
        chat.innerHTML += `<p><strong>@Brain:</strong> ${text[0].text}</p>`;
      });
  });
}

document.getElementById('refreshButton').addEventListener('click', function() {
  location.reload();
});
