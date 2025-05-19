import createMessageModel from "./message-model.js";
import createConfirmModel from "./confirm-model.js";

const editFormElem = document.querySelector("#edit-form");
const editFormSubmitElem = editFormElem?.querySelector("button[type='submit'");
const createFormElem = document.querySelector("#create-form");
const createFormSubmitElem = createFormElem?.querySelector(
  "button[type='submit'"
);
const deleteBtns = document.querySelectorAll(".list-controls button");

// Creates and add message and confirm models to html body.
// Returns the functions for show and close.
const messageModel = createMessageModel(document);
const confirmModel = createConfirmModel(document);

deleteBtns.forEach((button) => {
  button.addEventListener("click", async (ev) => {
    const id = ev.target.dataset.id;
    if (id) {
      const confirmed = await confirmModel.show(
        `Are you sure, you want to delete the post (id: ${id})`
      );
      if (confirmed) {
        const url = `${document.URL}/delete/${id}`;
        const res = await fetch(url, {
          method: "DELETE",
        });
        await messageModel.show(await res.text());
        window.location.reload();
      } else {
        console.log("Deletion cancelled by user.");
      }
    }
  });
});

createFormSubmitElem?.addEventListener("click", async (ev) => {
  ev.preventDefault();
  const jsonData = getJsonDataFromFormElem(createFormElem);
  const res = await fetch(document.URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: jsonData,
  });
  await messageModel.show(await res.text());
  if (res.ok) {
    window.location.reload();
  }
});

editFormSubmitElem?.addEventListener("click", async (ev) => {
  ev.preventDefault();
  const jsonData = getJsonDataFromFormElem(editFormElem);
  console.log(jsonData);
  const res = await fetch(document.URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: jsonData,
  });
  await messageModel.show(await res.text());
  if (res.ok) {
    window.location.reload();
  }
});

function getJsonDataFromFormElem(formElem) {
  const formData = new FormData(formElem);
  const obj = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return JSON.stringify(obj);
}
