const titleInputElem = document.getElementById("title");
const urlInputElem = document.getElementById("url");
const closeModelBtn = document.getElementById("close-model");
const modelElem = document.querySelector(".model");

// Focuse model close button if model visible at start.
if (!modelElem.classList.contains("hidden")) {
  closeModelBtn?.focus();
}

titleInputElem?.addEventListener("focusout", (ev) => {
  if (urlInputElem && urlInputElem.value === "") {
    let title = titleInputElem.value;
    urlInputElem.value = title.toLowerCase().replaceAll(" ", "-");
  }
});

closeModelBtn?.addEventListener("click", (ev) => {
  if (modelElem.classList.contains("hidden")) return;
  modelElem.classList.add("hidden");
});
