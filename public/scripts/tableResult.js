const resultTable = () => {
  const recordsButton = create("button")
  .addClass("button button-record")
  .addId("records")
  .content("records")
  .appendTo(document.querySelector(".heading__result"));

  const resultWrap  =  create("section").addClass("records").addId("records");
  const recordsBlock = create("div").addClass("records-wrapper").content(`<button class="records__button records__button--close">X</button>`).appendTo(resultWrap);

  table = create("table").addClass("records__table").addId("table").content(`
    <caption>High score table</caption>
    <thead>
        <tr>
        <th>№</th>
              <th>Name</th>
              <th>Time</th>
          </tr>
      </thead>
   `).appendTo(recordsBlock);
   document.querySelector(".form-container").after(resultWrap);

   recordsButton.onclick = () => resultWrap.classList.add("records--open");
   document.querySelector(".records__button--close").onclick = () => {
    document.querySelector(".records").classList.remove("records--open");
   }

};

resultTable();

// document.getElementById("records").addEventListener('click', () => {
//   create('div').addClass('table').content('table').appendTo(document.querySelector('.grid-container'));
// })