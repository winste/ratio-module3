document.querySelector(".button-record").addEventListener("click", async () => {
  recordsTable.create();
  const users = await getUsers();
  document.querySelector('.spinner').classList.add("spinner--hidden");

  if (users.length == 0) {
    recordsTable.showInfoMessage();
    return;
  }

  for (let i = 0; i < users.length; i++) {
    const table = document.getElementById("table");
    const tr = table.insertRow();
    tr.innerHTML = `<td>${i + 1}</td>
                    <td>${users[i].username}</td>
                    <td>${msToTime(users[i].time)}</td>`;
  }
});


const recordsTable = {
  create() {
    const resultWrap = create("section")
      .addClass("records modal-window modal-window--open")
      .addId("records")
  
    const recordsBlock = create("div")
      .addClass("records__wrapper modal-window__wrapper")
      .appendTo(resultWrap);
  
    const button = create("button")
      .addClass("records__button modal-window__button")
      .content("X")
      .appendTo(recordsBlock);
  
    const table = create("table")
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

  showInfoMessage() {
    document.querySelector(".records__wrapper").insertAdjacentHTML(
      "afterbegin",
      "<h2>There is no one here yet. Be the first!</h2>"
    );
  }
};


function msToTime(ms) {
  let milliseconds = Math.floor((ms % 1000) / 100);
  seconds = Math.floor((ms / 1000) % 60);
  minutes = Math.floor((ms / (1000 * 60)) % 60);
  hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  return hours
    ? `${hours}h ${minutes}m ${seconds}.${milliseconds}s`
    : `${minutes}m ${seconds}.${milliseconds}s`;
}
