document.getElementById('form').addEventListener('submit', async (event) => {  
  event.preventDefault();

  const userName = event.currentTarget[0].value;
  
  if (validateName(userName)) {
    const response = await send(userName, timer.timeResult);
    const responseText = await response.text();
    
    if (response.status = 200) {
      console.log("-Data sent on server");
      document.querySelector('.form-wrapper').innerHTML = '<h2 class="form__title">Your score has been recorded!</h2>'
      setTimeout(() => {
        document.querySelector('.form-container').classList.remove('form--open');
      }, 1500);
    }
  }
  else {
    alert('Невалидно')
  }
});

function validateName(userName) {
  var nameRegex = /^[a-z0-9_-]{3,16}$/;
  return userName.match(nameRegex);
}

  async function send(name, time) {
    return await fetch('/api/v1/record', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, time })
    })
  }

