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

const form = document.querySelector(".input");
const inputMobileButton = document.querySelector(".input-mobile-button");
const inputMobile = new InputMobile();

export { inputMobile, form, inputMobileButton };
