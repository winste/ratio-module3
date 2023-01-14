document.getElementById('form').addEventListener('submit', async (event) => {  
  event.preventDefault();

  const entryField = document.getElementById('input');
  const userName = entryField.value;
  const checkValidateName = userName => userName.match(/^[a-z0-9_-]{3,16}$/);
  
  if (checkValidateName(userName)) {
    const response = await send(userName, timer.timeResult);
    const responseText = await response.text();

    if (response.ok) {
      console.log(`name:${userName} time:${timer.timeResult} id:${responseText} added on DB`);
      document.querySelector('.form-wrapper').innerHTML = `<h2 class="form__title">Your record is recorded in the table</h2>`
      setTimeout(() => {
        document.querySelector('.form-container').classList.remove('form--open');
      }, 1500);
    }
  }
  else {
    alert('Invalid value');
  }
});


async function send(username, time) {
  return await fetch('/api/v1/record', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, time})
  })
}



