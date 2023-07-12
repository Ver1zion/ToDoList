import { toDoList, actualTasks, completedTasks } from "./classes/todolist.js";
import { burgerMenu } from "./classes/burger_menu.js";
import { textAreaInput, textArea } from "./classes/text_area_input.js";
import { clock } from "./classes/clock.js";
import {
  inputMobile,
  form,
  inputMobileButton,
} from "./classes/input_mobile.js";
import {
  slowStars,
  mediumSpeedStars,
  fastStars,
  ctx,
  canvas,
} from "./classes/starry_background.js";
/////////////////
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
    }, 1);
  });
}
/////////////////
const burgerOpen = document.querySelector(".burger");

burgerOpen.addEventListener("click", () => {
  if (burgerMenu.menuOpened) {
    burgerMenu.closeMenu();
  } else {
    burgerMenu.openMenu();
  }
  burgerMenu.menuOpened = !burgerMenu.menuOpened;
});
/////////////////
const resetButton = document.querySelector(".resetData");

resetButton.addEventListener("click", () => {
  burgerMenu.resetTasks();
});
/////////////////
const newTaskButton = document.querySelector(".input__button");

newTaskButton.addEventListener("click", () => {
  toDoList.createNewTask(textArea.value);
  toDoList.saveTasks();
  textAreaInput.updateInputText();
  textAreaInput.addAutoHeight();
});
/////////////////
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
/////////////////
actualTasks.addEventListener("click", (event) => {
  toDoList.moveToCompleted(event);
  toDoList.deleteTask(event);
  toDoList.saveTasks();
});
/////////////////
completedTasks.addEventListener("click", (event) => {
  toDoList.moveToActual(event);
  toDoList.deleteTask(event);
  toDoList.saveTasks();
});
/////////////////
document.addEventListener("DOMContentLoaded", () => {
  textAreaInput.updateInputText();
  toDoList.loadTasks();
  clock.startClock();
  clock.showCosmicObject();
  setInterval(() => {
    clock.showCosmicObject();
  }, 2000);
});
/////////////////
textArea.addEventListener("input", () => {
  textAreaInput.addAutoHeight();
});
/////////////////
form.addEventListener("focusout", () => {
  textAreaInput.addAutoHeight();
});
/////////////////
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

setTimeout(() => {
  ym(92909454, "reachGoal", "onemin");
}, 60000);

setTimeout(() => {
  ym(92909454, "reachGoal", "twomin");
}, 120000);
