const titleInputElem = document.getElementById("title");
const urlInputElem = document.getElementById("url");

titleInputElem?.addEventListener("focusout", (ev) => {
  if (urlInputElem && urlInputElem.value === "") {
    let title = titleInputElem.value;
    urlInputElem.value = title.toLowerCase().replaceAll(" ", "-");
  }
});
