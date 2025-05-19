export default function createConfirmModel(document) {
  const modelElem = document.createElement("div");
  modelElem.classList.add("model", "hidden");
  const contentElem = document.createElement("div");
  contentElem.classList.add("model-content");
  const paraElem = document.createElement("p");
  let yesButtonElem = document.createElement("button");
  yesButtonElem.classList.add("btn");
  yesButtonElem.textContent = "Yes";
  let noButtonElem = document.createElement("button");
  noButtonElem.classList.add("btn");
  noButtonElem.textContent = "No";

  contentElem.append(paraElem, yesButtonElem, noButtonElem);
  modelElem.appendChild(contentElem);
  document.body.appendChild(modelElem);

  return {
    show(message, yesBtnText = "Yes", noBtnText = "No") {
      paraElem.textContent = message;
      modelElem.classList.remove("hidden");
      const yesButtonClone = yesButtonElem.cloneNode(true);
      yesButtonElem.replaceWith(yesButtonClone);
      yesButtonElem = yesButtonClone;
      yesButtonElem.textContent = yesBtnText;
      yesButtonElem.focus();
      const noButtonClone = noButtonElem.cloneNode(true);
      noButtonElem.replaceWith(noButtonClone);
      noButtonElem = noButtonClone;
      noButtonElem.textContent = noBtnText;
      noButtonElem.focus();

      return new Promise((resolve, reject) => {
        yesButtonElem.addEventListener("click", () => {
          this.close();
          resolve(true);
        });
        noButtonElem.addEventListener("click", () => {
          this.close();
          resolve(false);
        });
      });
    },
    close() {
      paraElem.textContent = "";
      modelElem.classList.add("hidden");
    },
  };
}
