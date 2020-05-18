import { isUrlValid } from "./js/checkUrl";
import { handleSubmit } from "./js/formHandler";

import "./styles/style.scss";

const form = document.querySelector("#main-form");
const urlInput = document.querySelector("#url");
const submitBtn = document.querySelector("#main-form input[type=submit]");
const errorContainer = document.querySelector("#main-form .error");

urlInput.addEventListener("keyup", e => {
  if (isUrlValid(e.target.value)) errorContainer.classList.add("hidden");
  else errorContainer.classList.remove("hidden");
});

form.addEventListener("submit", e => {
  e.preventDefault();
  const url = urlInput.value;

  if (isUrlValid(url)) {
    submitBtn.value = "Waiting for the Response";
    handleSubmit(url, submitBtn);
  }
});
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        console.log("Offline Service Enabled ", registration);
      })
      .catch(registrationError => {
        console.log("Offline feature failed to establish: ", registrationError);
      });
  });
}


