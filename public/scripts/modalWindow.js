const createForm = () => {
  const formBlock = create("section").addClass("form-container");
  formWrap = create("div").addClass("form-wrapper").appendTo(formBlock);
  document.querySelector(".grid-container").after(formBlock);

  formTitle = create("h2")
    .addClass("form__title")
    .content("Congratulations, the game is won!")
    .appendTo(formWrap);

  formTitle = create("h3")
    .addClass("form__subtitle")
    .content("Enter your name to be entered in the recode table")
    .appendTo(formWrap);
    
  formField = create("form")
    .addClass("form container")
    .addId("form")
    .content(
      `<input id="input" class = "form__input" name = "input" placeholder = "your name"><button class = "form__button">add</button>`
    )
    .appendTo(formWrap);
};

createForm();
