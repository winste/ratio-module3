document.getElementById("form").addEventListener("submit", async (event) => { // слушатель для отслежвания отправки имени пользователем
  event.preventDefault();

  const userName = document.getElementById("input").value;  // получаем введенное имя
  const checkValidateName = (userName) => userName.match(/^[a-z0-9_-]{3,16}$/); // проверяем на валидность

  if (checkValidateName(userName)) {  // если имя валидно
    const response = await sendUser(userName, timer.timeResult);  // то отправляем запрос на сервер, передавая имя и время с таймера
    console.log(`name:${userName} time:${timer.timeResult} id:${response} added on DB`);
    addSuccessfulMessage();  // после отправки на сервер выводим сообщение об успешном добавлении в базу данных

  } else { 
    alert("Invalid value");  // выводится в случае невалидности данных
  }
});


function addSuccessfulMessage() {
  document.querySelector(".form__wrapper").innerHTML =   // заменяет содержимое окна на сообщение и добавляет кнопку для закрытия
      `<h2 class="form__title">Your record is recorded in the table</h2>
      <button class="form__button modal-window__button">X</button>`;

  document.querySelector('.modal-window__button').addEventListener('click', () => { // добавляет для новой появившейся кнопке слушатель, чтобы можно было это окно закрыть
    document.querySelector(".modal-window").classList.remove("modal-window--open");
  });
}


const sendUser = async (username, time) => {  // отправляет имя и время на сервер
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


const getUsers = async () => { // отправляет запрос на получение списка пользователей из базы данных
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


