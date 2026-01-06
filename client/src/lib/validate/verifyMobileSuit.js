import { create, test, enforce, only, include } from "vest";

const suite = create((data = {}, fieldName) => {
  only(fieldName);
  include("mobile").when("submit");
  include("name").when("submit");

  test("name", "Please enter your full name", () => {
    enforce(data.name).isNotBlank();
  });
  test("name", "Full name must be at least 3 characters long", () => {
    enforce(data.name).longerThan(2);
  });

  test("mobile", "Mobile number is required", () => {
    enforce(data.mobile).isNotBlank();
  });
  test("mobile", "Mobile number must contain only digits", () => {
    enforce(data.mobile).isNumeric();
  });

  test("mobile", "Mobile number must start with 6, 7, 8, or 9", () => {
    enforce(data.mobile).matches(/^[6-9]/);
  });

  test("mobile", "Mobile number must be exactly 10 digits long", () => {
    enforce(data.mobile).lengthEquals(10);
  });
});

export default suite;
