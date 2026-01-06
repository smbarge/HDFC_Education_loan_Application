import { create, test, enforce, only, include } from "vest";

const suite = create((data = {}, fieldName) => {
  only(fieldName);
  // include('seatno').when('submit')
  include("password").when("submit");
  include("confirmPassword").when("submit");
  include("password").when("confirmPassword");

  test("password", "password is required", () => {
    enforce(data.password).isNotBlank();
  });
  test("password", "Password is must be at least 6 char", () => {
    enforce(data.password).longerThanOrEquals(6);
  });

  test(
    "password",
    "need at least one special char [!@#$%^&*()_+{}[]:;<>,.?~\\/-]",
    () => {
      enforce(data.password).matches(/.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-].*/);
    }
  );

  test("password", "need at least one number", () => {
    enforce(data.password).matches(/.*[0-9].*/);
  });

  test("confirmPassword", "ConfirmPassword is required", () => {
    enforce(data.confirmPassword).isNotBlank();
  });
  test(
    "confirmPassword",
    "ConfirmPassword should be atleat 6 chars long",
    () => {
      enforce(data.confirmPassword).longerThanOrEquals(5);
    }
  );
  if (data.confirmPassword) {
    test("password", "confirm password and password must match", () => {
      enforce(data.confirmPassword).equals(data.password);
    });
  }
  test("confirmPassword", "Confirm Password and Password do not match", () => {
    enforce(data.confirmPassword).equals(data.password);
  });
});

export default suite;
