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
const textAreaInput = new TextAreaInput();

export { textAreaInput, textArea };
