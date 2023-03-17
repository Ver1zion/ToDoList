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
const clock = new Clock(clockTextArea);

export { clock };
