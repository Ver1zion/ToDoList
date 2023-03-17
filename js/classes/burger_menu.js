import { toDoList, actualTasks, completedTasks } from "./todolist.js";

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

const burgerActive = document.querySelector(".menu");
const burgerMenu = new BurgerMenu();

export {burgerMenu, burgerActive}