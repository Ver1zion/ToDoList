const newTaskButton = document.querySelector(".input__button");
const textInput = document.querySelector(".input__form");
const actualTasks = document.querySelector(".actual-tasks");

newTaskButton.addEventListener("click", () => {
  const taskText = textInput.value;
  if (taskText === "") return;
  const newLi = document.createElement("li");
  const textLi = document.createTextNode(taskText);
  newLi.appendChild(textLi);
  actualTasks.prepend(newLi);
  textInput.value = "";
});

// actualTasks.insertAdjacentHTML('afterbegin', "<li></li>"); - создаст новый ли элемент
