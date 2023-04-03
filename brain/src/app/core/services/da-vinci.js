//By Shak

const chat = document.getElementById('chat');
const form = document.getElementById('form');
const loading = document.getElementById("loading");
const downloadButton = document.getElementById("downloadButton");

if (form !== null) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = document.getElementById('message').value;
    if (message.trim() === "") {
      return;
    }
    chat.innerHTML += `<p><strong style="color: red;">@Pinky:</strong> ${message}</p>`;
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
    document.getElementById("message").value = "";
    loading.innerHTML = '<img src="src/assets/img/load-ico.gif" alt="loading" width="50" height="50">';

    // Request
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        prompt: message,
        model: 'text-davinci-003',
        max_tokens: 4000
      })
    });
    const data = await response.json();
    const text = data.choices;
    loading.innerHTML = "";
    chat.innerHTML += `<p><strong style="color: blue;">@Brain:</strong> ${text[0].text}</p>`;
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);

  });

  function downloadChatText(event) {
    event.preventDefault();
    const chat = document.getElementById('chat').innerText;
    if (chat.trim() !== "") {
      const blob = new Blob([chat], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '@Brain.txt';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }  
}