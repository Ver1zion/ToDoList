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
    burgerActive.style.width = "100vw";
    burgerActive.style.height = "100vh";
    burgerActive.style.right = "0";
    burgerActive.style.top = "0";
    burgerActive.style.transition = "0.3s";
  }

  closeMenu() {
    const childElements = burgerActive.querySelectorAll("*");
    childElements.forEach((element) => {
      element.style.display = "none";
    });
    burgerActive.style.width = "0vw";
    burgerActive.style.height = "0vh";
    burgerActive.style.right = "6%";
    burgerActive.style.top = "12.5%";
    burgerActive.style.transition = "0.3s";
  }
}

const burgerButton = document.querySelector(".burger");
const burgerActive = document.querySelector(".menu");
const burgerClose = document.querySelector(".menu__close-button");

const toDoList = new ToDoList();
const burgerMenu = new BurgerMenu();

burgerButton.addEventListener("click", () => {
  burgerMenu.openMenu();
});

burgerClose.addEventListener("click", (event) => {
  event.stopPropagation();
  burgerMenu.closeMenu();
});

newTaskButton.addEventListener("click", () => {
  toDoList.createNewTask(textInput.value);
  toDoList.updateInputText();
  toDoList.saveTasks();
});

textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    toDoList.createNewTask(textInput.value);
    toDoList.updateInputText();
    toDoList.saveTasks();
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
  toDoList.loadTasks();
});
