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
const actualTasks = document.querySelector(".actual-tasks");
const completedTasks = document.querySelector(".completed-tasks");

class BurgerMenu {
  constructor() {
    this.menuBoolean = false;
  }

  openMenu() {
    if (this.menuBoolean === false) {
      this.menuBoolean = true;
      const childElements = burgerActive.querySelectorAll("*");
      childElements.forEach((element) => {
        element.style.display = "block";
      });
      burgerActive.style.border = "2px solid white";
      burgerActive.style.width = "17vw";
      burgerActive.style.height = "60vh";
      burgerActive.style.top = "20vh";
      burgerActive.style.right = "3vw";
      burgerActive.style.transition = "0.3s";
    }
  }

  closeMenu() {
    if (this.menuBoolean === true) {
      this.menuBoolean = false;
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

  addAutoHeight() {
    if (textArea.scrollHeight >= 201) {
      textArea.style.height = "auto";
      textArea.style.height = textArea.scrollHeight + "px";
    } else if (textArea.scrollHeight < 201) {
      textArea.style.height = "20px";
    }
  }

  updateInputText() {
    textArea.value = "";
  }
}

const textArea = document.querySelector(".input__form");
const form = document.querySelector(".input");

class Clock {
  constructor(clockElement) {
    this.clockElement = clockElement;
  }

  startClock() {
    this.updateClock();
    setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  updateClock() {
    const date = new Date();
    const time = [date.getHours(), date.getMinutes(), date.getSeconds()];
    if (time[0] < 10) {
      time[0] = "0" + time[0];
    }
    if (time[1] < 10) {
      time[1] = "0" + time[1];
    }
    if (time[2] < 10) {
      time[2] = "0" + time[2];
    }
    const currentTime = [time[0], time[1], time[2]].join(":");
    this.clockElement.innerText = currentTime;
  }

  showSunOrMoon() {
    const date = new Date();
    if (date.getHours() >= 20 || date.getHours() < 7) {
      sunOrMoon.classList.remove("sun");
      clockContainer.classList.remove("clock_text-sun");
      sunOrMoon.classList.add("moon");
      clockContainer.classList.add("clock_text-moon");
    } else if (date.getHours() >= 7 || date.getHours() < 20) {
      sunOrMoon.classList.remove("moon");
      clockContainer.classList.remove("clock_text-moon");
      sunOrMoon.classList.add("sun");
      clockContainer.classList.add("clock_text-sun");
    }
  }

  moveClockAndCosmicObject() {
    if (window.pageYOffset < 100) {
      clockContainer.classList.remove("clock-container_pos-left-middle-fixed");
      sunOrMoon.classList.remove("sun-or-moon_pos-left-middle-fixed");
      clockContainer.classList.add("clock-container_pos-header-absol");
      sunOrMoon.classList.add("sun-or-moon_pos-header-absol");
    } else if (window.pageYOffset >= 100) {
      clockContainer.classList.remove("clock-container_pos-header-absol");
      sunOrMoon.classList.remove("sun-or-moon_pos-header-absol");
      clockContainer.classList.add("clock-container_pos-left-middle-fixed");
      sunOrMoon.classList.add("sun-or-moon_pos-left-middle-fixed");
    }
  }
}

const clockContainer = document.querySelector(".clock-container");
const clockTextArea = document.querySelector(".clock");
const sunOrMoon = document.querySelector(".sun-or-moon");

burgerOpen.addEventListener("click", () => {
  if (burgerMenu.menuBoolean) {
    // false default value
    burgerMenu.closeMenu();
  } else {
    burgerMenu.openMenu();
  }
});

resetButton.addEventListener("click", () => {
  burgerMenu.resetTasks();
  toDoList.saveTasks();
});

newTaskButton.addEventListener("click", () => {
  toDoList.createNewTask(textArea.value);
  toDoList.saveTasks();
  textAreaInput.updateInputText();
  textAreaInput.addAutoHeight();
});

textArea.addEventListener("keydown", (event) => {
  if (event.shiftKey && event.key === "Enter") {
    return;
  } else if (event.key === "Enter") {
    event.preventDefault();
    toDoList.createNewTask(textArea.value);
    toDoList.saveTasks();
    textAreaInput.updateInputText();
    textAreaInput.addAutoHeight();
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

window.addEventListener("scroll", () => {
  clock.moveClockAndCosmicObject();
});

document.addEventListener("DOMContentLoaded", () => {
  textAreaInput.updateInputText();
  toDoList.loadTasks();
  clock.startClock();
  clock.showSunOrMoon();
  setInterval(() => {
    clock.showSunOrMoon();
  }, 2000);
});

textArea.addEventListener("input", () => {
  textAreaInput.addAutoHeight();
});

form.addEventListener("focusout", () => {
  textAreaInput.addAutoHeight();
}); // using to 

const toDoList = new ToDoList();
const burgerMenu = new BurgerMenu();
const textAreaInput = new TextAreaInput();
const clock = new Clock(clockTextArea);
