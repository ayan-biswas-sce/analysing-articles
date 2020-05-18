import { handleSubmit } from "../formHandler";

window.fetch = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    json: () =>
      Promise.resolve({
        polarity: "positive",
        subjectivity: "subjective",
        text: "The example"
      })
  });
});

describe("handleSubmit", () => {
  test("it fetches data from the server and populates the html page with resolved data", () => {
    document.body.innerHTML = `
      <form id="main-form">
        <div>
          <input id="url" type="text" placeholder="Enter a URL" required>
          <span class="error hidden">
            Please enter a valid URL
          </span>
        </div>
        <input type="submit" name="" value="Loading.......">
      </form>

      <section>
        <strong id="results-heading"></strong>
        <div id="results"></div>
      </section>
    `;
    const urlInput = document.querySelector("#url");
    const submitBtn = document.querySelector("input[type=submit]");
    const resultsHeader = document.querySelector("#results-heading");
    const resultsContainer = document.querySelector("#results");

    urlInput.value = "http://example.com";
    handleSubmit(urlInput.value, submitBtn, resultsHeader, resultsContainer).then(() => {
      expect(submitBtn.value).toBe("submit");
      expect(resultsHeader.textContent).toEqual("Form Results:");
      expect(resultsContainer.innerHTML).toEqual("<p>Polarity: positive</p><p>Subjectivity: subjective</p><p>The example</p>")
    })

  });
});
