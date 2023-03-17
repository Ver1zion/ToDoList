class ToDoList {
  constructor() {
  }

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

const actualTasks = document.querySelector(".actual-tasks");
const completedTasks = document.querySelector(".completed-tasks");
const toDoList = new ToDoList();

export { toDoList, actualTasks, completedTasks };
