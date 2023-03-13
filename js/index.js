class ToDoList {
  constructor() {}

  createNewTask(taskText) {
    if (taskText === "") return;
    const newLi = document.createElement("li");
    const textLi = document.createTextNode(taskText);
    const closeButton = document.createElement("div");
    closeButton.classList.add("close-button");
    newLi.prepend(textLi);
    newLi.append(closeButton);
    newLi.classList.add("added");
    actualTasks.append(newLi);
  }

  createCompletedTask(taskText) {
    if (taskText === "") return;
    const newLi = document.createElement("li");
    const textLi = document.createTextNode(taskText);
    const closeButton = document.createElement("div");
    closeButton.classList.add("close-button");
    newLi.prepend(textLi);
    newLi.append(closeButton);
    newLi.classList.add("added");
    completedTasks.append(newLi);
  }

  moveToCompleted(event) {
    const liElem = event.target.closest("li");
    if (liElem && !event.target.closest(".close-button")) {
      completedTasks.prepend(liElem);
    }
  }

  moveToActual(event) {
    const liElem = event.target.closest("li");
    if (liElem && !event.target.closest(".close-button")) {
      actualTasks.append(liElem);
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
    this.menuOpened = false;
  }

  openMenu() {
    const childElements = burgerActive.querySelectorAll("*");
    if (window.innerWidth < 768) {
      childElements.forEach((element) => {
        element.style.display = "block";
      });
      burgerActive.style.width = "100vw";
      burgerActive.style.height = "100vh";
      burgerActive.style.top = "0vh";
      burgerActive.style.right = "0vw";
      burgerActive.style.transition = "0.3s";
      return;
    }
    if (window.innerWidth > 768) {
      childElements.forEach((element) => {
        element.style.display = "block";
      });
      burgerActive.style.width = "17vw";
      burgerActive.style.height = "60vh";
      burgerActive.style.top = "20vh";
      burgerActive.style.right = "3vw";
      burgerActive.style.transition = "0.3s";
    }
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
    if (window.innerWidth < 768) {
      burgerActive.style.top = "6vh";
    } else {
      burgerActive.style.top = "12.5vh";
    }
  }

  resetTasks() {
    localStorage.removeItem("actualTasks");
    localStorage.removeItem("completedTasks");
    const allActualTasks = actualTasks.querySelectorAll("li");
    allActualTasks.forEach((task) => {
      task.classList.remove("added");
      task.classList.add("deleted");
      setTimeout(() => {
        task.remove();
        toDoList.saveTasks();
      }, 300);
    });
    const allCompletedTasks = completedTasks.querySelectorAll("li");
    allCompletedTasks.forEach((task) => {
      task.classList.remove("added");
      task.classList.add("deleted");
      setTimeout(() => {
        task.remove();
        toDoList.saveTasks();
      }, 300);
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
    if (textArea.scrollHeight >= 151) {
      textArea.style.height = "auto";
      textArea.style.height = textArea.scrollHeight + "px";
    } else if (textArea.scrollHeight < 151) {
      textArea.style.height = "40px";
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

  showCosmicObject() {
    const date = new Date();
    if (date.getHours() >= 20 || date.getHours() < 7) {
      cosmicObject.classList.remove("sun");
      clockContainer.classList.remove("clock_text-sun");
      cosmicObject.classList.add("moon");
      clockContainer.classList.add("clock_text-moon");
    } else if (date.getHours() >= 7 || date.getHours() < 20) {
      cosmicObject.classList.remove("moon");
      clockContainer.classList.remove("clock_text-moon");
      cosmicObject.classList.add("sun");
      clockContainer.classList.add("clock_text-sun");
    }
  }

  moveClockAndCosmicObject() {
    if (window.innerWidth <= 768) return;
    if (window.pageYOffset < 1) {
      clockAndCosmicObject.classList.remove(
        "clock-cosmic-object__container_pos-left-fixed"
      );
    } else if (window.pageYOffset >= 1) {
      clockAndCosmicObject.classList.add(
        "clock-cosmic-object__container_pos-left-fixed"
      );
    }
  }
}

const clockAndCosmicObject = document.querySelector(
  ".clock-cosmic-object__container"
);
const clockContainer = document.querySelector(".clock-container");
const clockTextArea = document.querySelector(".clock");
const cosmicObject = document.querySelector(".cosmic-object");

class InputMobile {
  constructor() {
    this.inputOpened = false;
  }

  openInput() {
    form.style.transform = "scale(1)";
    inputMobileButton.style.transform = "rotate(45deg)";
    inputMobile.inputOpened = true;
  }

  closeInput() {
    form.style.transform = "scale(0)";
    inputMobileButton.style.transform = "rotate(0deg)";
    inputMobile.inputOpened = false;
  }
}

const inputMobileButton = document.querySelector(".input-mobile-button");

if (window.innerWidth <= 768) {
  inputMobileButton.addEventListener("click", () => {
    if (inputMobile.inputOpened) {
      inputMobile.closeInput();
      textAreaInput.updateInputText();
    } else {
      inputMobile.openInput();
      textArea.focus();
    }
  });

  textArea.addEventListener("focusout", () => {
    setTimeout(() => {
      inputMobile.closeInput();
      textAreaInput.updateInputText();
    }, 1); // used to close input if user click on button
  });
}

burgerOpen.addEventListener("click", () => {
  if (burgerMenu.menuOpened) {
    burgerMenu.closeMenu();
  } else {
    burgerMenu.openMenu();
  }
  burgerMenu.menuOpened = !burgerMenu.menuOpened;
});

resetButton.addEventListener("click", () => {
  burgerMenu.resetTasks();
});

newTaskButton.addEventListener("click", () => {
  toDoList.createNewTask(textArea.value);
  toDoList.saveTasks();
  textAreaInput.updateInputText();
  textAreaInput.addAutoHeight();
});

if (window.innerWidth > 768) {
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

  window.addEventListener("scroll", () => {
    clock.moveClockAndCosmicObject();
  });
}

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
  textAreaInput.updateInputText();
  toDoList.loadTasks();
  clock.startClock();
  clock.showCosmicObject();
  setInterval(() => {
    clock.showCosmicObject();
  }, 2000);
});

textArea.addEventListener("input", () => {
  textAreaInput.addAutoHeight();
});

form.addEventListener("focusout", () => {
  textAreaInput.addAutoHeight();
});

const toDoList = new ToDoList();
const burgerMenu = new BurgerMenu();
const textAreaInput = new TextAreaInput();
const clock = new Clock(clockTextArea);
const inputMobile = new InputMobile();

//////////////////////////////////////////
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const requestAnimationFrame = window.requestAnimationFrame;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

class StarryBackground {
  constructor(starCount) {
    this.starArray = [];
    for (let i = 0; i < starCount; i++) {
      this.starArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
      });
    }
  }

  draw() {
    for (let star of this.starArray) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    }
  }

  update(speed) {
    this.starArray.forEach((star) => {
      star.x -= speed;
      if (star.x < 0) {
        star.x = canvas.width;
      }
    });
  }
}

const slowStars = new StarryBackground(225);
const mediumSpeedStars = new StarryBackground(125);
const fastStars = new StarryBackground(125);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fastStars.update(0.14);
  fastStars.draw();
  mediumSpeedStars.update(0.09);
  mediumSpeedStars.draw();
  slowStars.update(0.05);
  slowStars.draw();
  requestAnimationFrame(animate);
}

animate();
