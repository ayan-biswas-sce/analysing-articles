import { isUrlValid } from "../checkUrl";

describe("isUrlValid", () => {
  test("it returns false for invalid urls", () => {
    const urls = ["example", "example."];

    urls.forEach(url => {
      expect(isUrlValid(url)).toBeFalsy;
    });
  });

  test("it returns true for valid urls", () => {
    const urls = [
      "https://example.com",
      "http://example.com",
      "example.com",
      "example.com/path1",
      "example.com/path1/path2",
      "example.com?query=value"
    ];

    urls.forEach(url => {
      expect(isUrlValid(url)).toBeTruthy;
    });
  });
});
