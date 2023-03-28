//BY SHAK

const chat = document.getElementById('chat');
const form = document.getElementById('form');
const loading = document.getElementById("loading");

if (form !== null) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = document.getElementById('message').value;
    chat.innerHTML += `<p><strong style="color: red;">@Pinky:</strong> ${message}</p>`;
    document.getElementById("message").value = "";
    loading.innerHTML = '<img src="src/assets/img/load-ico.gif" alt="loading" width="50" height="50">';

    // Request
    fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
      },
      body: JSON.stringify({
        prompt: message,
        model: 'text-davinci-003',
        max_tokens: 4000
      })
    }).then(response => response.json())
      .then(data => {
        const text = data.choices;
        loading.innerHTML = "";
        chat.innerHTML += `<p><strong style="color: blue;">@Brain:</strong> ${text[0].text}</p>`;
      });
  });
}
