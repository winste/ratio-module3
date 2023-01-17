document.getElementById("form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const userName = document.getElementById("input").value;
  const checkValidateName = (userName) => userName.match(/^[a-z0-9_-]{3,16}$/);

  if (checkValidateName(userName)) {
    const response = await sendUser(userName, timer.timeResult);
    console.log(`name:${userName} time:${timer.timeResult} id:${response} added on DB`);
    addSuccessfulMessage();

  } else {
    alert("Invalid value");
  }
});


function addSuccessfulMessage() {
  document.querySelector(".form__wrapper").innerHTML = 
      `<h2 class="form__title">Your record is recorded in the table</h2>
      <button class="form__button modal-window__button">X</button>`;

  document.querySelector('.modal-window__button').addEventListener('click', () => {
    document.querySelector(".modal-window").classList.remove("modal-window--open");
  });
}


const sendUser = async (username, time) => {
  try {
    const response = await fetch("/api/v1/record", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( {username, time} )
    })
    const result = await response.json();
    return result;

  } catch (error) {
    console.log(error);
  }
}


const getUsers = async () => {
  try {
    const response = await fetch("/api/v1/record", {
      method: "GET"
    })
    const result = await response.json();
    return result;

  } catch (error) {
    console.log(error);
  }
}


