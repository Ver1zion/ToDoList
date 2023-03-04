class ToDoList {
  constructor() {}

  createNewTask() {
    this.taskText = textInput.value;
    if (this.taskText === "") return;
    this.newLi = document.createElement("li");
    this.textLi = document.createTextNode(this.taskText);
    this.closeButton = document.createElement("div");
    this.closeButton.classList.add("close-button");
    this.newLi.prepend(this.textLi);
    this.newLi.append(this.closeButton);
    actualTasks.prepend(this.newLi);
    this.updateInputText();
  }

  updateInputText() {
    textInput.value = "";
  }

  moveToCompleted(event) {
    this.liElem = event.target.closest("li");
    if (this.liElem && !event.target.closest(".close-button")) {
      this.clonedLiElem = this.liElem.cloneNode(true);
      this.liElem.remove();
      completedTasks.prepend(this.clonedLiElem);
    }
  }

  moveToActual(event) {
    if (event.target.closest("li") && !event.target.closest(".close-button")) {
      this.clonedLiElem = event.target.cloneNode(true);
      event.target.remove();
      actualTasks.append(this.clonedLiElem);
    }
  }

  deleteTask(event) {
    if (event.target.closest(".close-button")) {
      event.target.closest("li").remove();
    }
  }
}

const newTaskButton = document.querySelector(".input__button");
const textInput = document.querySelector(".input__form");
const actualTasks = document.querySelector(".actual-tasks");
const completedTasks = document.querySelector(".completed-tasks");

const toDoList = new ToDoList();

newTaskButton.addEventListener("click", () => {
  toDoList.createNewTask();
  toDoList.updateInputText();
});

actualTasks.addEventListener("click", (event) => {
  toDoList.moveToCompleted(event);
  toDoList.deleteTask(event);
});

completedTasks.addEventListener("click", (event) => {
  toDoList.moveToActual(event);
  toDoList.deleteTask(event);
});
