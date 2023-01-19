document.querySelector(".button-record").addEventListener("click", async () => {  // слушатель на кнопку records
  recordsTable.create();  // создает модльное окно и отрисовывает таблицу
  
  const users = await getUsers();  // отправляем запрос и получаем список пользователей с сервера
  document.querySelector('.spinner').classList.add("spinner--hidden");  // после получения данных убираем прелоадер

  if (users.length == 0) {  // если в базе данных вообще нет записей
    recordsTable.showInfoMessage(); // выводим сообщение
    return;
  }

  for (let i = 0; i < users.length; i++) {  // перебираем полученный с сервера массив пользователей
    const table = document.getElementById("table"); 
    const tr = table.insertRow();
    tr.innerHTML = `<td>${i + 1}</td>   
                    <td>${users[i].username}</td>
                    <td>${msToTime(users[i].time)}</td>`;  // добавляем каждого пользавателя в строку в ранее созданную таблицу
  }
});


const recordsTable = {  // объект для создания таблицы рекордов
  create() {  // создает таблицу 
    const resultWrap = create("section")
      .addClass("records modal-window modal-window--open")
      .addId("records")
  
    const recordsBlock = create("div")  // обертка модального окна
      .addClass("records__wrapper modal-window__wrapper")
      .appendTo(resultWrap);
  
    const button = create("button")  // создаем кнопку закрытия
      .addClass("records__button modal-window__button")
      .content("X")
      .appendTo(recordsBlock);
  
    const table = create("table")  // создание шапки таблицы
      .addClass("records__table")
      .addId("table")
      .content(
        `
            <caption>High score table</caption>
            <tr>
              <th>№</th>
              <th>Name</th>
              <th>Time</th>
            </tr>
          `
      )
      .appendTo(recordsBlock);
   // создаем прелоадер
    const preloader = create('div').addClass("spinner").content(`
      <div class="spinner__ball"></div>
      <div class="spinner__ball"></div>
      <div class="spinner__ball"></div>
    `)
  
    button.onclick = () => {
      resultWrap.classList.remove("modal-window--open");
    };
    
    table.after(preloader);
    document.querySelector('.form').after(resultWrap);
  },

  showInfoMessage() {  // выводит сообщение перед таблицей, если в базе данных нет записей
    document.querySelector(".records__wrapper").insertAdjacentHTML(
      "afterbegin",
      "<h2>There is no one here yet. Be the first!</h2>"
    );
  }
};


function msToTime(ms) {  // переводит полученное в милисекундах время в формат hh:mm:ss:ms
  let milliseconds = Math.floor((ms % 1000) / 100);
  seconds = Math.floor((ms / 1000) % 60);
  minutes = Math.floor((ms / (1000 * 60)) % 60);
  hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  return hours
    ? `${hours}h ${minutes}m ${seconds}.${milliseconds}s`
    : `${minutes}m ${seconds}.${milliseconds}s`;
}
