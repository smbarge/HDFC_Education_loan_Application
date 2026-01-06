import { create, test, enforce, only, include } from "vest";

const suite = create((data = {}, fieldName) => {
  only(fieldName);
  include("name").when("submit");

  test("name", "Please provide your name.", () => {
    enforce(data.name).isNotBlank();
  });
});

export default suite;
