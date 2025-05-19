export default function createMessageModel(document) {
  const modelElem = document.createElement("div");
  modelElem.classList.add("model", "hidden");
  const contentElem = document.createElement("div");
  contentElem.classList.add("model-content");
  const paraElem = document.createElement("p");
  let buttonElem = document.createElement("button");
  buttonElem.classList.add("btn");
  buttonElem.textContent = "Ok";

  contentElem.append(paraElem, buttonElem);
  modelElem.appendChild(contentElem);
  document.body.appendChild(modelElem);

  return {
    show(message, btnText = "Ok") {
      paraElem.textContent = message;
      modelElem.classList.remove("hidden");
      const buttonClone = buttonElem.cloneNode(true);
      buttonElem.replaceWith(buttonClone);
      buttonElem = buttonClone;
      buttonElem.textContent = btnText;
      buttonElem.focus();

      return new Promise((resolve, reject) => {
        buttonElem.addEventListener("click", () => {
          this.close();
          resolve();
        });
      });
    },
    close() {
      paraElem.textContent = "";
      modelElem.classList.add("hidden");
    },
  };
}
