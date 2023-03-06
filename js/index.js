class ToDoList {
  constructor() {}

  createNewTask(taskText) {
    this.taskText = taskText;
    if (this.taskText === "") return;
    this.newLi = document.createElement("li");
    this.textLi = document.createTextNode(this.taskText);
    this.closeButton = document.createElement("div");
    this.closeButton.classList.add("close-button");
    this.newLi.prepend(this.textLi);
    this.newLi.append(this.closeButton);
    this.newLi.classList.add("added");
    actualTasks.append(this.newLi);
    this.updateInputText();
  }

  createCompletedTask(taskText) {
    this.taskText = taskText;
    if (this.taskText === "") return;
    this.newLi = document.createElement("li");
    this.textLi = document.createTextNode(this.taskText);
    this.closeButton = document.createElement("div");
    this.closeButton.classList.add("close-button");
    this.newLi.prepend(this.textLi);
    this.newLi.append(this.closeButton);
    this.newLi.classList.add("added");
    completedTasks.append(this.newLi);
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
      const liElem = event.target.closest("li");
      liElem.classList.add("deleted");
      liElem.classList.remove("added");
      liElem.addEventListener("animationend", () => {
        liElem.remove();
        this.saveTasks();
      });
    }
  }

  saveTasks() {
    const actualTasksArr = [...actualTasks.querySelectorAll("li")].map(
      (li) => li.innerText
    );
    const completedTaskArr = [...completedTasks.querySelectorAll("li")].map(
      (li) => li.innerText
    );
    localStorage.setItem("actualTasks", JSON.stringify(actualTasksArr));
    localStorage.setItem("completedTasks", JSON.stringify(completedTaskArr));
  }

  loadTasks() {
    const actualTasksArr = JSON.parse(localStorage.getItem("actualTasks"));
    const completedTaskArr = JSON.parse(localStorage.getItem("completedTasks"));
    if (actualTasksArr) {
      actualTasksArr.forEach((taskText) => {
        this.createNewTask(taskText);
      });
    }
    if (completedTaskArr) {
      completedTaskArr.forEach((taskText) => {
        this.createCompletedTask(taskText);
      });
    }
  }
}

const newTaskButton = document.querySelector(".input__button");
const textInput = document.querySelector(".input__form");
const actualTasks = document.querySelector(".actual-tasks");
const completedTasks = document.querySelector(".completed-tasks");

class BurgerMenu {
  constructor() {}

  openMenu() {
    const childElements = burgerActive.querySelectorAll("*");
    childElements.forEach((element) => {
      element.style.display = "block";
    });
    burgerActive.style.border = "2px solid white";
    burgerActive.style.width = "60vw";
    burgerActive.style.height = "60vh";
    burgerActive.style.top = "20vh";
    burgerActive.style.right = "20vw";
    burgerActive.style.transition = "0.3s";
  }

  closeMenu() {
    const childElements = burgerActive.querySelectorAll("*");
    childElements.forEach((element) => {
      element.style.display = "none";
    });
    burgerActive.style.border = "";
    burgerActive.style.width = "0vw";
    burgerActive.style.height = "0vh";
    burgerActive.style.right = "6vw";
    burgerActive.style.top = "12.5vh";
    burgerActive.style.transition = "0.3s";
  }

  resetTasks() {
    localStorage.removeItem("actualTasks");
    localStorage.removeItem("completedTasks");
    const allActualTasks = actualTasks.querySelectorAll("li");
    allActualTasks.forEach((task) => {
      task.remove();
    });
    const allCompletedTasks = completedTasks.querySelectorAll("li");
    allCompletedTasks.forEach((task) => {
      task.remove();
    });
  }
}

const burgerOpen = document.querySelector(".burger");
const burgerActive = document.querySelector(".menu");
const burgerClose = document.querySelector(".menu__close-button");
const resetButton = document.querySelector(".resetData");

class TextAreaInput {
  constructor() {}

  areaAutoHeight() {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    form.style.height = `${textarea.scrollHeight * 1.19}px`;
  }
}

const textarea = document.querySelector(".input__form");
const form = document.querySelector(".input");

burgerOpen.addEventListener("click", () => {
  burgerMenu.openMenu();
});

burgerClose.addEventListener("click", (event) => {
  event.stopPropagation();
  burgerMenu.closeMenu();
});

resetButton.addEventListener("click", () => {
  burgerMenu.resetTasks();
  toDoList.saveTasks();
});

newTaskButton.addEventListener("click", () => {
  toDoList.createNewTask(textInput.value);
  toDoList.updateInputText();
  toDoList.saveTasks();
  textAreaInput.areaAutoHeight();
});

textInput.addEventListener("keydown", (event) => {
  if (event.shiftKey && event.key === "Enter") {
    return;
  } else if (event.key === "Enter") {
    event.preventDefault();
    toDoList.createNewTask(textInput.value);
    toDoList.updateInputText();
    toDoList.saveTasks();
    textAreaInput.areaAutoHeight();
  }
});

actualTasks.addEventListener("click", (event) => {
  toDoList.moveToCompleted(event);
  toDoList.deleteTask(event);
  toDoList.saveTasks();
});

completedTasks.addEventListener("click", (event) => {
  toDoList.moveToActual(event);
  toDoList.deleteTask(event);
  toDoList.saveTasks();
});

document.addEventListener("DOMContentLoaded", () => {
  toDoList.updateInputText();
  toDoList.loadTasks();
});

textarea.addEventListener("input", () => {
  textAreaInput.areaAutoHeight();
});

const toDoList = new ToDoList();
const burgerMenu = new BurgerMenu();
const textAreaInput = new TextAreaInput();
