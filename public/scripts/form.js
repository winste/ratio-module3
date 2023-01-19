const createForm = () => {  // объект создает форму, вспылывающую при победе
  const formBlock = create("section").addClass("form modal-window");
  formWrap = create("div").addClass("form__wrapper modal-window__wrapper").appendTo(formBlock);
  document.querySelector(".grid-container").after(formBlock);

  formTitle = create("h2")
    .addClass("form__title")
    .content("Congratulations, the game is won!")
    .appendTo(formWrap);

  formSubtitle = create("h3")  
    .addClass("form__subtitle")
    .content("Enter your name to be entered in the recode table")
    .appendTo(formWrap);
    
  formField = create("form")
    .addId("form")
    .content(
      `<input id="input" class = "form__input" required  placeholder = "your name here">
       <button class = "form__button">add</button>`
    )
    .appendTo(formWrap);
};

createForm();